'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Texture procedurali (nessun file esterno, nessuna risorsa di terzi) */
/* ------------------------------------------------------------------ */

function useGinghamTexture() {
  return useMemo(() => {
    const size = 512;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d')!;
    g.fillStyle = '#f4ead8';
    g.fillRect(0, 0, size, size);
    const cell = size / 8;
    g.fillStyle = 'rgba(150,48,38,0.5)';
    for (let i = 0; i < 8; i += 2) {
      g.fillRect(i * cell, 0, cell, size);
      g.fillRect(0, i * cell, size, cell);
    }
    // trama del tessuto
    for (let y = 0; y < size; y += 2) {
      g.fillStyle = `rgba(60,30,20,${0.025 + Math.random() * 0.03})`;
      g.fillRect(0, y, size, 1);
    }
    for (let x = 0; x < size; x += 2) {
      g.fillStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.03})`;
      g.fillRect(x, 0, 1, size);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(9, 9);
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/* ---------------------------- Oggetti ----------------------------- */

function Plate() {
  const geo = useMemo(() => {
    const pts = [
      [0, 0.0], [0.55, 0.0], [0.62, 0.02], [0.66, 0.06], [0.7, 0.07], [1.05, 0.11], [1.22, 0.17], [1.27, 0.2],
      [1.26, 0.215], [1.2, 0.2], [1.03, 0.145], [0.7, 0.1], [0.0, 0.1],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const g = new THREE.LatheGeometry(pts, 96);
    g.computeVertexNormals();
    return g;
  }, []);
  const rim = useMemo(() => new THREE.TorusGeometry(1.18, 0.008, 8, 120), []);
  return (
    <group>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshPhysicalMaterial color="#fbf8f1" roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      {/* filo decorativo sul bordo, da piatto di trattoria */}
      <mesh geometry={rim} rotation-x={Math.PI / 2} position-y={0.188}>
        <meshStandardMaterial color="#344d3b" roughness={0.4} />
      </mesh>
    </group>
  );
}

/** Strangozzi: pasta a sezione quadrata → tubi con 4 segmenti radiali. */
function Strangozzi() {
  const { geometry, extras } = useMemo(() => {
    const rand = mulberry32(7);
    const tubes: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 46; i++) {
      const pts: THREE.Vector3[] = [];
      let a = rand() * Math.PI * 2;
      let r = 0.1 + rand() * 0.45;
      const turns = 3 + Math.floor(rand() * 4);
      for (let j = 0; j < turns * 6; j++) {
        a += 0.55 + rand() * 0.35;
        r = THREE.MathUtils.clamp(r + (rand() - 0.5) * 0.14, 0.05, 0.62);
        const mound = 0.42 * Math.max(0, 1 - (r / 0.7) ** 2);
        const y = 0.13 + mound * (0.55 + rand() * 0.45) + (i / 46) * 0.07;
        pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const tube = new THREE.TubeGeometry(curve, pts.length * 6, 0.026, 4, false);
      tubes.push(tube);
    }
    const merged = mergeGeometries(tubes);

    // guanciale, pepe, pecorino
    const bits: { p: [number, number, number]; s: number; r: number; type: 'g' | 'p' | 'c' }[] = [];
    for (let i = 0; i < 70; i++) {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand()) * 0.5;
      const y = 0.16 + 0.44 * Math.max(0, 1 - (r / 0.7) ** 2) + 0.04;
      const type = i < 22 ? 'g' : i < 52 ? 'p' : 'c';
      bits.push({ p: [Math.cos(a) * r, y, Math.sin(a) * r], s: type === 'g' ? 0.035 + rand() * 0.025 : type === 'p' ? 0.008 : 0.014, r: rand() * Math.PI, type });
    }
    return { geometry: merged, extras: bits };
  }, []);

  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial color="#efc463" roughness={0.38} sheen={0.6} sheenColor="#fff1c9" clearcoat={0.25} clearcoatRoughness={0.5} />
      </mesh>
      {extras.map((b, i) => (
        <mesh key={i} position={b.p} rotation={[b.r, b.r * 2, b.r / 2]} castShadow={b.type === 'g'}>
          {b.type === 'g' ? <boxGeometry args={[b.s, b.s * 0.75, b.s * 1.2]} /> : <icosahedronGeometry args={[b.s, 0]} />}
          <meshStandardMaterial
            color={b.type === 'g' ? (i % 3 === 0 ? '#e7b6a0' : '#c97a5e') : b.type === 'p' ? '#2a211c' : '#f6efdc'}
            roughness={b.type === 'g' ? 0.45 : 0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function Fork() {
  const metal = <meshStandardMaterial color="#d9d6cf" metalness={1} roughness={0.22} />;
  return (
    <group position={[1.62, 0.03, 0.15]} rotation={[0, -0.12, 0]}>
      <RoundedBox args={[0.14, 0.03, 1.3]} radius={0.012} position={[0, 0, 0.55]} castShadow>
        {metal}
      </RoundedBox>
      <RoundedBox args={[0.2, 0.025, 0.3]} radius={0.01} position={[0, 0.005, -0.25]} castShadow>
        {metal}
      </RoundedBox>
      {[-0.075, -0.025, 0.025, 0.075].map((x) => (
        <RoundedBox key={x} args={[0.026, 0.02, 0.5]} radius={0.008} position={[x, 0.01, -0.62]} castShadow>
          {metal}
        </RoundedBox>
      ))}
    </group>
  );
}

function Glass({ position }: { position: [number, number, number] }) {
  const { glass, wine } = useMemo(() => {
    const outer = [
      [0, 0], [0.3, 0], [0.32, 0.02], [0.34, 0.75], [0.33, 0.76], [0.31, 0.04], [0, 0.05],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const w = [[0, 0.05], [0.305, 0.05], [0.315, 0.42], [0, 0.42]].map(([x, y]) => new THREE.Vector2(x, y));
    return { glass: new THREE.LatheGeometry(outer, 64), wine: new THREE.LatheGeometry(w, 64) };
  }, []);
  return (
    <group position={position}>
      <mesh geometry={wine}>
        <meshPhysicalMaterial color="#5b0f1c" roughness={0.1} transmission={0.25} thickness={0.5} />
      </mesh>
      <mesh geometry={glass} castShadow>
        <meshPhysicalMaterial color="#ffffff" roughness={0.04} transmission={1} thickness={0.12} ior={1.45} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function Carafe({ position }: { position: [number, number, number] }) {
  const { body, wine } = useMemo(() => {
    const profile = [
      [0, 0], [0.38, 0], [0.42, 0.06], [0.44, 0.35], [0.36, 0.7], [0.2, 0.95], [0.17, 1.25], [0.2, 1.36], [0.19, 1.37], [0.15, 1.26], [0.16, 0.95], [0.33, 0.7], [0.41, 0.35], [0.38, 0.05], [0, 0.04],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const w = [[0, 0.04], [0.37, 0.05], [0.4, 0.35], [0.36, 0.6], [0, 0.6]].map(([x, y]) => new THREE.Vector2(x, y));
    return { body: new THREE.LatheGeometry(profile, 64), wine: new THREE.LatheGeometry(w, 64) };
  }, []);
  return (
    <group position={position}>
      <mesh geometry={wine}>
        <meshPhysicalMaterial color="#5e1020" roughness={0.12} transmission={0.2} thickness={0.6} />
      </mesh>
      <mesh geometry={body} castShadow>
        <meshPhysicalMaterial color="#f4fff8" roughness={0.05} transmission={1} thickness={0.15} ior={1.45} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function Bread({ position }: { position: [number, number, number] }) {
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(0.28, 6);
    const rand = mulberry32(3);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      v.multiplyScalar(1 + Math.sin(v.x * 18) * Math.cos(v.z * 14) * 0.025 + (rand() - 0.5) * 0.01);
      v.y *= 0.55;
      v.x *= 1.35;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <group position={position} rotation={[0, 0.6, 0]}>
      <mesh geometry={geo} castShadow position={[0, 0.12, 0]}>
        <meshStandardMaterial color="#c9894a" roughness={0.85} />
      </mesh>
      <mesh geometry={geo} castShadow position={[0.36, 0.1, 0.22]} rotation={[0.2, 1.2, 0.1]} scale={0.8}>
        <meshStandardMaterial color="#d49a5b" roughness={0.85} />
      </mesh>
    </group>
  );
}

function Napkin() {
  return (
    <RoundedBox args={[1.1, 0.04, 1.6]} radius={0.015} position={[1.75, 0.0, 0.3]} rotation={[0, -0.12, 0]} receiveShadow castShadow>
      <meshStandardMaterial color="#f3ead6" roughness={0.95} />
    </RoundedBox>
  );
}

function Steam() {
  const group = useRef<THREE.Group>(null);
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d')!;
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  const puffs = useMemo(() => Array.from({ length: 9 }, (_, i) => ({ x: (i % 3 - 1) * 0.18, z: (Math.floor(i / 3) - 1) * 0.15, o: i * 0.37 })), []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current?.children.forEach((s, i) => {
      const p = puffs[i];
      const k = (t * 0.22 + p.o) % 1;
      s.position.set(p.x + Math.sin(t + i) * 0.06, 0.7 + k * 1.3, p.z);
      s.scale.setScalar(0.35 + k * 0.7);
      ((s as THREE.Sprite).material as THREE.SpriteMaterial).opacity = Math.sin(k * Math.PI) * 0.22;
    });
  });
  return (
    <group ref={group}>
      {puffs.map((_, i) => (
        <sprite key={i}>
          <spriteMaterial map={tex} transparent depthWrite={false} opacity={0} />
        </sprite>
      ))}
    </group>
  );
}

/* ----------------------------- Regia ------------------------------ */

function Rig({ reduced, layout }: { reduced: boolean; layout: 'wide' | 'narrow' }) {
  const plate = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();
  const start = useRef(performance.now());
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    const scroll = THREE.MathUtils.clamp(window.scrollY / (window.innerHeight * 0.9), 0, 1);
    const intro = reduced ? 1 : easeOutCubic(Math.min(1, (performance.now() - start.current) / 2600));
    const offsetX = layout === 'wide' ? -1.25 : 0;

    // Camera: dall'inquadratura a 3/4 verso una vista più dall'alto mentre si scorre
    const camPos = new THREE.Vector3(
      offsetX + (reduced ? 0 : pointer.x * 0.25),
      THREE.MathUtils.lerp(4.4, 3.1, intro) + scroll * 1.6 + (reduced ? 0 : pointer.y * 0.12),
      THREE.MathUtils.lerp(7.8, layout === 'wide' ? 5.6 : 6.6, intro) - scroll * 2.2,
    );
    camera.position.lerp(camPos, reduced ? 1 : 1 - Math.pow(0.001, dt));
    target.set(offsetX, 0.15 - scroll * 0.05, layout === 'wide' ? 0.2 : 1.25);
    camera.lookAt(target);

    if (plate.current && !reduced) {
      plate.current.rotation.y = -0.4 + intro * 0.4 + scroll * Math.PI * 0.55 + performance.now() * 0.00004;
    }
  });

  return (
    <group ref={plate}>
      <Plate />
      <Strangozzi />
      {!reduced && <Steam />}
    </group>
  );
}

function Scene({ reduced, layout }: { reduced: boolean; layout: 'wide' | 'narrow' }) {
  const gingham = useGinghamTexture();
  return (
    <>
      <color attach="background" args={['#30251e']} />
      <fog attach="fog" args={['#30251e', 7.5, 15]} />

      <ambientLight intensity={0.12} color="#ffe6c4" />
      <directionalLight
        position={[-4, 7, 3]}
        intensity={2.1}
        color="#ffd29a"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0004}
        shadow-radius={6}
      />
      <pointLight position={[3, 2.5, -2]} intensity={6} color="#ffb070" distance={10} />

      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffe2b8" position={[-3, 5, 2]} scale={[6, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={2} color="#ffb36b" position={[4, 2, -3]} scale={2} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.6} color="#fff6ea" position={[0, 3, 6]} scale={[10, 2, 1]} target={[0, 0, 0]} />
      </Environment>

      {/* Tavolo con tovaglia a quadretti */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.005} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial map={gingham} roughness={0.92} />
      </mesh>
      <ContactShadows position={[0, 0.001, 0]} opacity={0.55} scale={12} blur={2.6} far={2} resolution={512} color="#2a1610" />

      <Rig reduced={reduced} layout={layout} />
      <Fork />
      <Napkin />
      <Glass position={[0.8, 0, -1.7]} />
      <Carafe position={[1.85, 0, -2.7]} />
      <Bread position={[-0.6, 0, -1.85]} />
    </>
  );
}

export default function TrattoriaScene({ onReady }: { onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layout: 'wide' | 'narrow' = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'wide' : 'narrow';
  const visible = useRef(true);
  const invalidateRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
      if (e.isIntersecting) invalidateRef.current();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.92 }}
        camera={{ fov: 32, near: 0.1, far: 40, position: [0, 4.4, 7.8] }}
        onCreated={({ invalidate }) => {
          invalidateRef.current = invalidate;
          onReady?.();
        }}
        frameloop="always"
      >
        <PauseWhenHidden visible={visible} />
        <Scene reduced={reduced} layout={layout} />
      </Canvas>
    </div>
  );
}

/** Ferma il rendering quando la hero non è visibile (risparmio batteria). */
function PauseWhenHidden({ visible }: { visible: React.MutableRefObject<boolean> }) {
  const set = useThree((s) => s.setFrameloop);
  useFrame(() => {
    if (!visible.current) set('demand');
  });
  useEffect(() => {
    const onScroll = () => visible.current && set('always');
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [set, visible]);
  return null;
}

/* ----------------------------- Utility ---------------------------- */

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Unione semplice di geometrie non indicizzate/indicizzate con stessi attributi. */
function mergeGeometries(geos: THREE.BufferGeometry[]) {
  const nonIndexed = geos.map((g) => (g.index ? g.toNonIndexed() : g));
  const total = nonIndexed.reduce((n, g) => n + g.attributes.position.count, 0);
  const pos = new Float32Array(total * 3);
  const nor = new Float32Array(total * 3);
  let off = 0;
  for (const g of nonIndexed) {
    pos.set(g.attributes.position.array as Float32Array, off * 3);
    nor.set(g.attributes.normal.array as Float32Array, off * 3);
    off += g.attributes.position.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  return out;
}

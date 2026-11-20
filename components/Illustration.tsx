/**
 * Illustrazioni a tratto, usate come segnaposto artistici finché non arrivano
 * le fotografie originali del locale. Nessuna immagine di terzi.
 */
export type IllustrationKind = 'pasta' | 'moka' | 'awning' | 'wine' | 'borgo' | 'porcini' | 'pot' | 'tart' | 'room' | 'artichoke';

const S = { stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function Illustration({ kind, className = '' }: { kind: IllustrationKind; className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden focusable="false">
      {kind === 'pasta' && (
        <g>
          <ellipse cx="100" cy="100" rx="78" ry="34" fill="#fffcf6" {...S} />
          <ellipse cx="100" cy="97" rx="56" ry="22" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.5" />
          <path d="M62 92c10-18 22 6 32-10s20 10 30-4 18 8 14 16M66 100c12-10 20 8 34-4s18 10 30-2M74 86c8-10 16 4 26-6s16 6 24-2" stroke="#ddaa55" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M72 94c10-6 18 6 30-2s16 4 26-2" stroke="#c98a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="88" cy="88" r="3" fill="#a83c30" /><circle cx="112" cy="92" r="2.6" fill="#a83c30" /><circle cx="100" cy="82" r="2.4" fill="#a83c30" />
          <path d="M150 52l-28 40M156 56l-28 40M146 48l18 12" {...S} />
        </g>
      )}
      {kind === 'moka' && (
        <g>
          <path d="M78 134h44l-6-46H84z" fill="#c9c2b6" {...S} />
          <path d="M80 88h40l-4-8H84z" fill="#30251e" {...S} />
          <path d="M84 80l-8-46h48l-8 46z" fill="#d8d2c6" {...S} />
          <path d="M76 34h48" {...S} />
          <path d="M100 26v8" {...S} />
          <path d="M122 46c14 0 18 10 16 22s-10 14-16 12" {...S} />
          <path d="M76 40l-12-6" {...S} />
          <path d="M92 18c-4-6 4-8 0-14M104 20c-4-6 4-8 0-14" stroke="currentColor" strokeOpacity=".5" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="148" cy="134" rx="20" ry="5" fill="#fffcf6" {...S} />
          <path d="M136 132v-14h24v14" fill="#fffcf6" {...S} />
          <ellipse cx="148" cy="118" rx="12" ry="3" fill="#6b4a33" />
        </g>
      )}
      {kind === 'awning' && (
        <g>
          <rect x="30" y="62" width="140" height="80" fill="#efe2c8" {...S} />
          <path d="M22 40h156l-10 26H32z" fill="#344d3b" {...S} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={`M${40 + i * 20} 40l-2 26h10l2-26z`} fill="#f3ead6" />
          ))}
          <path d="M32 66c4 8 12 8 16 0 4 8 12 8 16 0 4 8 12 8 16 0 4 8 12 8 16 0 4 8 12 8 16 0 4 8 12 8 16 0 4 8 12 8 16 0 4 8 12 8 16 0" fill="#344d3b" {...S} />
          <rect x="54" y="84" width="38" height="58" fill="#30251e" opacity=".85" />
          <rect x="108" y="86" width="44" height="30" fill="#fffcf6" {...S} />
          <path d="M108 101h44M130 86v30" {...S} />
          <circle cx="86" cy="114" r="2" fill="#ddaa55" />
          <text x="100" y="34" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="15" fill="currentColor">Il Postaccio</text>
        </g>
      )}
      {kind === 'wine' && (
        <g>
          <path d="M60 136h40M80 136V104c-16-2-24-14-24-30l4-36h40l4 36c0 16-8 28-24 30" fill="none" {...S} />
          <path d="M57 72c2 14 10 24 23 24s21-10 23-24z" fill="#7d1f2a" />
          <path d="M122 136c-14 0-18-6-18-18 0-16 12-22 12-40V40h20v38c0 18 12 24 12 40 0 12-4 18-18 18z" fill="#fffcf6" fillOpacity=".5" {...S} />
          <path d="M107 108c4-6 10-8 15-8s11 2 15 8c0 12-4 20-15 20s-15-8-15-20z" fill="#7d1f2a" />
          <path d="M114 40h24" {...S} />
        </g>
      )}
      {kind === 'borgo' && (
        <g>
          <path d="M0 150c30-30 60-48 100-50s70 20 100 50z" fill="#344d3b" fillOpacity=".25" />
          <path d="M30 104l10-10h10v-8h8v8h14V70h10v24h14V60l8-10 8 10v34h14v-10h10v10h12l10 10z" fill="#efe2c8" {...S} />
          <path d="M112 50v-14M108 40h8" {...S} />
          <path d="M20 150c10-20 30-36 60-42M180 150c-10-20-30-36-60-42" {...S} strokeOpacity=".6" />
          {[30, 50, 70, 130, 150, 170].map((x, i) => (
            <path key={i} d={`M${x} ${128 + (i % 2) * 6}h14`} stroke="#344d3b" strokeWidth="3" strokeLinecap="round" />
          ))}
          <circle cx="160" cy="34" r="12" fill="#ddaa55" opacity=".8" />
        </g>
      )}
      {kind === 'porcini' && (
        <g>
          <ellipse cx="100" cy="122" rx="74" ry="22" fill="#fffcf6" {...S} />
          {[[70, 104], [100, 98], [128, 106], [86, 116], [116, 118]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M${x - 14} ${y}c0-14 28-14 28 0z`} fill="#c98a2e" {...S} />
              <path d={`M${x - 6} ${y}v8c0 3 12 3 12 0v-8`} fill="#f3e2c0" {...S} />
            </g>
          ))}
          <path d="M150 112c8-4 14 0 12 6" {...S} />
          <circle cx="54" cy="116" r="4" fill="#ddaa55" />
        </g>
      )}
      {kind === 'pot' && (
        <g>
          <path d="M44 74h112v44c0 14-12 22-26 22H70c-14 0-26-8-26-22z" fill="#a83c30" {...S} />
          <path d="M38 74h124" {...S} />
          <path d="M44 86h-12M156 86h12" {...S} />
          <path d="M60 74c4-16 76-16 80 0" fill="#30251e" opacity=".9" />
          <path d="M80 50c-6-8 6-10 0-20M100 46c-6-8 6-10 0-20M120 50c-6-8 6-10 0-20" stroke="currentColor" strokeOpacity=".5" fill="none" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M140 66l30-44" stroke="#8b6a4a" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {kind === 'tart' && (
        <g>
          <ellipse cx="100" cy="112" rx="72" ry="26" fill="#fffcf6" {...S} />
          <path d="M40 104c0-14 120-14 120 0v10c0 12-120 12-120 0z" fill="#d9a35e" {...S} />
          <path d="M44 104c4-10 108-10 112 0" fill="#7d1f2a" />
          {[56, 76, 96, 116, 136].map((x) => (
            <path key={x} d={`M${x} 96l14 18`} stroke="#e8bf7d" strokeWidth="5" strokeLinecap="round" />
          ))}
          {[66, 92, 118].map((x) => (
            <path key={x} d={`M${x + 20} 95l-16 19`} stroke="#e8bf7d" strokeWidth="5" strokeLinecap="round" />
          ))}
        </g>
      )}
      {kind === 'artichoke' && (
        <g>
          <ellipse cx="100" cy="122" rx="74" ry="22" fill="#fffcf6" {...S} />
          {[[72, 108], [100, 100], [128, 110]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M${x} ${y + 12}c-14-4-16-20-10-28 4 6 6 10 10 12 4-2 6-6 10-12 6 8 4 24-10 28z`} fill="#c98a2e" {...S} />
              <path d={`M${x} ${y + 12}c-6-6-6-16 0-22 6 6 6 16 0 22z`} fill="#ddaa55" {...S} />
            </g>
          ))}
          <path d="M146 112c6-2 10 2 8 6" {...S} />
        </g>
      )}
      {kind === 'room' && (
        <g>
          <path d="M10 140h180" {...S} />
          {[40, 140].map((x) => (
            <g key={x}>
              <path d={`M${x - 30} 104h60v6h-60z`} fill="#fffcf6" {...S} />
              <path d={`M${x - 30} 110l6 30M${x + 30} 110l-6 30`} {...S} />
              <path d={`M${x - 30} 104l-4 16h68l-4-16`} fill="#a83c30" fillOpacity=".75" {...S} />
              <path d={`M${x - 16} 96v8M${x + 16} 96v8`} stroke="#ddaa55" strokeWidth="5" strokeLinecap="round" />
            </g>
          ))}
          <rect x="70" y="20" width="60" height="44" fill="#efe2c8" {...S} />
          <path d="M100 20v44M70 42h60" {...S} />
          <path d="M20 40c10 0 10 10 20 10M160 40c10 0 10 10 20 10" stroke="#344d3b" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

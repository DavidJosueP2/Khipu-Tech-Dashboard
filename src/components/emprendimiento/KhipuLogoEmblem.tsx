import { STRATEGIC_IDENTITY } from "@/data/emprendimiento";

/**
 * Emblema vectorial fiel a la Figura 1 de Guia Ape 01.pdf:
 * grafo ortogonal de nodos Khipu integrados en la letra «K» con núcleo
 * cristalino aguamarina (#00D2D3) y firma KHIPUTECH</>.
 */
export function KhipuLogoEmblem() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex size-48 items-center justify-center sm:size-52">
        {/* Resplandor aguamarina sutil detrás del emblema */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-6 rounded-full bg-primary/20 blur-2xl"
        />

        <svg
          viewBox="0 0 220 220"
          className="relative size-full"
          fill="none"
          aria-label="Símbolo geométrico KhipuTech"
        >
          <defs>
            <linearGradient id="khipu-core" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6AF3F4" />
              <stop offset="55%" stopColor="#00D2D3" />
              <stop offset="100%" stopColor="#0E8E99" />
            </linearGradient>
          </defs>

          {/* Anillo fino contenedor */}
          <circle
            cx="110"
            cy="110"
            r="96"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />

          {/* Malla poligonal izquierda (principio de registro del Khipu) */}
          <path
            d="M44 110 L74 72 L106 110 L74 148 Z"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinejoin="round"
            className="text-foreground"
          />
          <path
            d="M44 110 L106 110 M74 72 L74 148"
            stroke="var(--primary)"
            strokeWidth="1.6"
            strokeOpacity="0.65"
          />

          {/* Eje vertical principal y brazos diagonales de la letra "K" */}
          <path
            d="M106 46 L106 174 M106 110 L166 56 M106 110 L166 164"
            stroke="currentColor"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
          />

          {/* Núcleo hexagonal aguamarina central */}
          <polygon
            points="106,86 127,98 127,122 106,134 85,122 85,98"
            fill="url(#khipu-core)"
            fillOpacity="0.92"
            stroke="var(--background)"
            strokeWidth="2.5"
          />
          <polygon
            points="106,95 119,102.5 119,117.5 106,125 93,117.5 93,102.5"
            stroke="#FFFFFF"
            strokeOpacity="0.45"
            strokeWidth="1"
          />

          {/* Nodos de terminación (nudos de datos) */}
          <circle cx="44" cy="110" r="4.5" fill="var(--primary)" />
          <circle cx="74" cy="72" r="4" fill="currentColor" className="text-foreground" />
          <circle cx="74" cy="148" r="4" fill="currentColor" className="text-foreground" />
          <circle cx="106" cy="46" r="5" fill="var(--primary)" />
          <circle cx="106" cy="174" r="5" fill="var(--primary)" />
          <circle cx="166" cy="56" r="5.5" fill="var(--primary)" />
          <circle cx="166" cy="164" r="5.5" fill="var(--primary)" />
        </svg>
      </div>

      {/* Nombre de marca */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-center gap-1 text-2xl font-bold tracking-tight text-foreground">
          <span>KHIPU</span>
          <span className="font-light text-foreground/85">TECH</span>
          <span className="text-base font-semibold text-primary">
            &lt;/&gt;
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Control inteligente de lotes y prevención de mermas
        </p>
      </div>

      {/* Pilares cromáticos y conceptuales reales */}
      <ul className="mt-6 space-y-2 text-left text-xs">
        {STRATEGIC_IDENTITY.pillars.map((pillar) => (
          <li key={pillar.label} className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full border border-border-strong"
              style={{ backgroundColor: pillar.swatch }}
            />
            <span className="font-semibold text-foreground">{pillar.label}</span>
            <span className="text-muted-foreground">{pillar.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

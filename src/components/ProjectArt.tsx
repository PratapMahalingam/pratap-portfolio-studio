// Original illustrations for the three projects without public figures.
// They are labelled "Illustration" wherever they appear and contain no data.
export default function ProjectArt({ kind }: { kind: "flight" | "breach" | "equity" }) {
  if (kind === "flight")
    return (
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs><radialGradient id="fl" cx="0.5" cy="0.4" r="0.8"><stop offset="0" stopColor="#1f3cff" /><stop offset="1" stopColor="#060a2a" /></radialGradient></defs>
        <rect width="400" height="300" fill="url(#fl)" />
        <g stroke="#ffffff" strokeOpacity="0.08">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 36} 0V300M0 ${i * 28}H400`} />)}</g>
        <g fill="none" stroke="#9fb6ff" strokeWidth="1.5" strokeDasharray="4 6">
          <path d="M40 240 Q200 40 360 120" /><path d="M30 120 Q180 200 370 60" /><path d="M60 60 Q220 280 380 230" />
        </g>
        <path d="M200 150 l-30 -6 l-4 -6 l30 2 l12 -26 l8 2 l-6 28 l26 4 l6 -8 l6 1 l-4 12 l4 12 l-6 1 l-6 -8 l-26 4 l6 28 l-8 2 l-12 -26 l-30 2 l4 -6z" fill="#c6ff3d" />
      </svg>
    );
  if (kind === "breach")
    return (
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs><linearGradient id="br" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a0c5c" /><stop offset="1" stopColor="#07080d" /></linearGradient></defs>
        <rect width="400" height="300" fill="url(#br)" />
        <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#ffffff" fillOpacity="0.14">
          {Array.from({ length: 14 }, (_, r) => <text key={r} x="10" y={20 + r * 20}>{"0x3F 0xA1 0x7C 0x00 0xFF 0x1B 0xE4 0x92 0x5D 0x0C 0x88 0x41".slice(r % 5)}</text>)}
        </g>
        <rect x="150" y="110" width="100" height="84" rx="12" fill="#7a2cff" />
        <path d="M168 110 v-22 a32 32 0 0 1 64 0 v22" fill="none" stroke="#7a2cff" strokeWidth="14" />
        <circle cx="200" cy="146" r="10" fill="#07080d" /><rect x="196" y="150" width="8" height="22" fill="#07080d" />
        <path d="M120 230 h40 v-18 h40 v-30 h40 v-46 h40" fill="none" stroke="#ffb02e" strokeWidth="3" />
      </svg>
    );
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs><linearGradient id="eq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1b1404" /><stop offset="1" stopColor="#07080d" /></linearGradient></defs>
      <rect width="400" height="300" fill="url(#eq)" />
      <g stroke="#ffd36a" strokeOpacity="0.12">{[60, 110, 160, 210, 260].map((y) => <path key={y} d={`M0 ${y}H400`} />)}</g>
      {[[40, 200, 1], [72, 180, 0], [104, 190, 1], [136, 160, 1], [168, 170, 0], [200, 140, 1], [232, 120, 1], [264, 130, 0], [296, 100, 1], [328, 80, 1]].map(([x, y, up], i) => (
        <g key={i}><path d={`M${x} ${y - 24}V${y + 44}`} stroke="#ffd36a" /><rect x={x - 8} y={y} width="16" height="30" fill={up ? "#ffd36a" : "#5b4410"} /></g>
      ))}
      <text x="350" y="250" textAnchor="middle" fontFamily="Instrument Serif, serif" fontSize="72" fill="#ffd36a">β</text>
    </svg>
  );
}

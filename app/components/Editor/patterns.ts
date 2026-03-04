export interface Pattern {
  id: string
  label: string
  preview: (c: string) => string
  render: (c: string) => string
}

export const PATTERNS: Pattern[] = [
  {
    id: 'circles', label: 'Círculos',
    preview: (c) => `<circle cx="0" cy="0" r="35" fill="none" stroke="${c}" stroke-width="1" opacity="0.25"/><circle cx="0" cy="0" r="55" fill="none" stroke="${c}" stroke-width="0.6" opacity="0.12"/><circle cx="88" cy="50" r="35" fill="none" stroke="${c}" stroke-width="1" opacity="0.25"/><circle cx="88" cy="50" r="55" fill="none" stroke="${c}" stroke-width="0.6" opacity="0.12"/>`,
    render: (c) => `<circle cx="0" cy="0" r="200" fill="none" stroke="${c}" stroke-width="3" opacity="0.15"/><circle cx="0" cy="0" r="310" fill="none" stroke="${c}" stroke-width="2" opacity="0.08"/><circle cx="520" cy="296" r="200" fill="none" stroke="${c}" stroke-width="3" opacity="0.15"/><circle cx="520" cy="296" r="310" fill="none" stroke="${c}" stroke-width="2" opacity="0.08"/><circle cx="260" cy="148" r="80" fill="${c}" opacity="0.04"/>`,
  },
  {
    id: 'grid', label: 'Grade',
    preview: (c) => { let l = ''; for (let x = 0; x <= 88; x += 11) l += `<line x1="${x}" y1="0" x2="${x}" y2="50" stroke="${c}" stroke-width="0.5" opacity="0.25"/>`; for (let y = 0; y <= 50; y += 10) l += `<line x1="0" y1="${y}" x2="88" y2="${y}" stroke="${c}" stroke-width="0.5" opacity="0.25"/>`; return l },
    render: (c) => { let l = ''; for (let x = 0; x <= 520; x += 40) l += `<line x1="${x}" y1="0" x2="${x}" y2="296" stroke="${c}" stroke-width="1" opacity="0.18"/>`; for (let y = 0; y <= 296; y += 40) l += `<line x1="0" y1="${y}" x2="520" y2="${y}" stroke="${c}" stroke-width="1" opacity="0.18"/>`; return l },
  },
  {
    id: 'diagonal', label: 'Diagonais',
    preview: (c) => { let l = ''; for (let i = -50; i <= 140; i += 12) l += `<line x1="${i}" y1="0" x2="${i + 50}" y2="50" stroke="${c}" stroke-width="0.8" opacity="0.22"/>`; return l },
    render: (c) => { let l = ''; for (let i = -300; i <= 820; i += 40) l += `<line x1="${i}" y1="0" x2="${i + 296}" y2="296" stroke="${c}" stroke-width="1.5" opacity="0.15"/>`; return l },
  },
  {
    id: 'dots', label: 'Pontos',
    preview: (c) => { let d = ''; for (let x = 7; x <= 81; x += 10) for (let y = 5; y <= 45; y += 10) d += `<circle cx="${x}" cy="${y}" r="1.5" fill="${c}" opacity="0.3"/>`; return d },
    render: (c) => { let d = ''; for (let x = 20; x <= 500; x += 30) for (let y = 20; y <= 276; y += 30) d += `<circle cx="${x}" cy="${y}" r="3" fill="${c}" opacity="0.2"/>`; return d },
  },
  {
    id: 'waves', label: 'Ondas',
    preview: (c) => { let p = ''; for (let i = 0; i < 6; i++) { const y = 8 + i * 8; p += `<path d="M0 ${y} Q22 ${y - 6} 44 ${y} Q66 ${y + 6} 88 ${y}" fill="none" stroke="${c}" stroke-width="0.8" opacity="0.25"/>` } return p },
    render: (c) => { let p = ''; for (let i = 0; i < 10; i++) { const y = 30 + i * 30; p += `<path d="M0 ${y} Q130 ${y - 25} 260 ${y} Q390 ${y + 25} 520 ${y}" fill="none" stroke="${c}" stroke-width="2" opacity="0.18"/>` } return p },
  },
  {
    id: 'triangles', label: 'Triângulos',
    preview: (c) => `<polygon points="0,50 22,0 44,50" fill="${c}" opacity="0.1"/><polygon points="44,50 66,0 88,50" fill="${c}" opacity="0.1"/><polygon points="22,0 44,50 66,0" fill="none" stroke="${c}" stroke-width="0.6" opacity="0.25"/>`,
    render: (c) => `<polygon points="0,296 180,0 360,296" fill="${c}" opacity="0.07"/><polygon points="160,296 340,0 520,296" fill="${c}" opacity="0.07"/><polygon points="80,0 260,296 440,0" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.12"/><polygon points="-60,296 120,0 300,296" fill="none" stroke="${c}" stroke-width="1" opacity="0.08"/>`,
  },
  {
    id: 'hexagons', label: 'Hexágonos',
    preview: (c) => `<polygon points="22,5 34,5 40,16 34,27 22,27 16,16" fill="none" stroke="${c}" stroke-width="0.8" opacity="0.3"/><polygon points="48,19 60,19 66,30 60,41 48,41 42,30" fill="none" stroke="${c}" stroke-width="0.8" opacity="0.3"/>`,
    render: (c) => {
      const hp = (cx: number, cy: number, r: number) =>
        Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 180 * (60 * i - 30); return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}` }).join(' ')
      return [[80,60],[200,60],[320,60],[440,60],[140,130],[260,130],[380,130],[80,200],[200,200],[320,200],[440,200]]
        .map(([cx, cy]) => `<polygon points="${hp(cx, cy, 55)}" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.16"/>`)
        .join('')
    },
  },
  { id: 'solid', label: 'Limpo', preview: () => '', render: () => '' },
]

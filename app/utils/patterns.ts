export interface Pattern {
  id: string;
  label: string;
  preview: (c: string) => string;
  render: (c: string) => string;
}

export const PATTERNS: Pattern[] = [
  { id: "solid", label: "Limpo", preview: () => "", render: () => "" },
  {
    id: "circles",
    label: "Círculos",
    preview: (c) =>
      `<circle cx="0" cy="0" r="35" fill="none" stroke="${c}" stroke-width="3" opacity="1"/><circle cx="0" cy="0" r="55" fill="none" stroke="${c}" stroke-width="2" opacity="0.7"/><circle cx="88" cy="50" r="35" fill="none" stroke="${c}" stroke-width="3" opacity="1"/><circle cx="88" cy="50" r="55" fill="none" stroke="${c}" stroke-width="2" opacity="0.7"/>`,
    render: (c) =>
      `<circle cx="0" cy="0" r="200" fill="none" stroke="${c}" stroke-width="3" opacity="0.15"/><circle cx="0" cy="0" r="310" fill="none" stroke="${c}" stroke-width="2" opacity="0.08"/><circle cx="520" cy="296" r="200" fill="none" stroke="${c}" stroke-width="3" opacity="0.15"/><circle cx="520" cy="296" r="310" fill="none" stroke="${c}" stroke-width="2" opacity="0.08"/><circle cx="260" cy="148" r="80" fill="${c}" opacity="0.04"/>`,
  },
  {
    id: "grid",
    label: "Grade",
    preview: (c) => {
      let l = "";
      for (let x = 0; x <= 88; x += 11)
        l += `<line x1="${x}" y1="0" x2="${x}" y2="50" stroke="${c}" stroke-width="1" opacity="1"/>`;
      for (let y = 0; y <= 50; y += 10)
        l += `<line x1="0" y1="${y}" x2="88" y2="${y}" stroke="${c}" stroke-width="1" opacity="1"/>`;
      return l;
    },
    render: (c) => {
      let l = "";
      for (let x = 0; x <= 520; x += 40)
        l += `<line x1="${x}" y1="0" x2="${x}" y2="296" stroke="${c}" stroke-width="1" opacity="0.18"/>`;
      for (let y = 0; y <= 296; y += 40)
        l += `<line x1="0" y1="${y}" x2="520" y2="${y}" stroke="${c}" stroke-width="1" opacity="0.18"/>`;
      return l;
    },
  },
  {
    id: "diagonal",
    label: "Diagonais",
    preview: (c) => {
      let l = "";
      for (let i = -50; i <= 140; i += 12)
        l += `<line x1="${i}" y1="0" x2="${i + 50}" y2="50" stroke="${c}" stroke-width="1.5" opacity="1"/>`;
      return l;
    },
    render: (c) => {
      let l = "";
      for (let i = -300; i <= 820; i += 40)
        l += `<line x1="${i}" y1="0" x2="${i + 296}" y2="296" stroke="${c}" stroke-width="1.5" opacity="0.15"/>`;
      return l;
    },
  },
  {
    id: "dots",
    label: "Pontos",
    preview: (c) => {
      let d = "";
      for (let x = 7; x <= 81; x += 10)
        for (let y = 5; y <= 45; y += 10)
          d += `<circle cx="${x}" cy="${y}" r="2.5" fill="${c}" opacity="1"/>`;
      return d;
    },
    render: (c) => {
      let d = "";
      for (let x = 20; x <= 500; x += 30)
        for (let y = 20; y <= 276; y += 30)
          d += `<circle cx="${x}" cy="${y}" r="3" fill="${c}" opacity="0.2"/>`;
      return d;
    },
  },
  {
    id: "waves",
    label: "Ondas",
    preview: (c) => {
      let p = "";
      for (let i = 0; i < 6; i++) {
        const y = 8 + i * 8;
        p += `<path d="M0 ${y} Q22 ${y - 6} 44 ${y} Q66 ${y + 6} 88 ${y}" fill="none" stroke="${c}" stroke-width="1.5" opacity="1"/>`;
      }
      return p;
    },
    render: (c) => {
      let p = "";
      for (let i = 0; i < 10; i++) {
        const y = 30 + i * 30;
        p += `<path d="M0 ${y} Q130 ${y - 25} 260 ${y} Q390 ${y + 25} 520 ${y}" fill="none" stroke="${c}" stroke-width="2" opacity="0.18"/>`;
      }
      return p;
    },
  },
  {
    id: "triangles",
    label: "Triângulos",
    preview: (c) =>
      `<polygon points="0,50 22,0 44,50" fill="${c}" opacity="0.4"/><polygon points="44,50 66,0 88,50" fill="${c}" opacity="0.4"/><polygon points="22,0 44,50 66,0" fill="none" stroke="${c}" stroke-width="1.5" opacity="1"/>`,
    render: (c) =>
      `<polygon points="0,296 180,0 360,296" fill="${c}" opacity="0.07"/><polygon points="160,296 340,0 520,296" fill="${c}" opacity="0.07"/><polygon points="80,0 260,296 440,0" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.12"/><polygon points="-60,296 120,0 300,296" fill="none" stroke="${c}" stroke-width="1" opacity="0.08"/>`,
  },
  {
    id: "hexagons",
    label: "Hexágonos",
    preview: (c) =>
      `<polygon points="22,5 34,5 40,16 34,27 22,27 16,16" fill="none" stroke="${c}" stroke-width="2" opacity="1"/><polygon points="48,19 60,19 66,30 60,41 48,41 42,30" fill="none" stroke="${c}" stroke-width="2" opacity="1"/>`,
    render: (c) => {
      const hp = (cx: number, cy: number, r: number) =>
        Array.from({ length: 6 }, (_, i) => {
          const a = (Math.PI / 180) * (60 * i - 30);
          return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
        }).join(" ");
      return [
        [80, 60],
        [200, 60],
        [320, 60],
        [440, 60],
        [140, 130],
        [260, 130],
        [380, 130],
        [80, 200],
        [200, 200],
        [320, 200],
        [440, 200],
      ]
        .map(
          ([cx, cy]) =>
            `<polygon points="${hp(cx, cy, 55)}" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.16"/>`,
        )
        .join("");
    },
  },


  {
    id: "crosshatch",
    label: "Xadrez",
    preview: (c) => {
      let l = "";
      for (let i = -50; i <= 140; i += 12)
        l += `<line x1="${i}" y1="0" x2="${i + 50}" y2="50" stroke="${c}" stroke-width="1" opacity="0.9"/>`;
      for (let i = -50; i <= 140; i += 12)
        l += `<line x1="${i + 50}" y1="0" x2="${i}" y2="50" stroke="${c}" stroke-width="1" opacity="0.9"/>`;
      return l;
    },
    render: (c) => {
      let l = "";
      for (let i = -300; i <= 820; i += 40)
        l += `<line x1="${i}" y1="0" x2="${i + 296}" y2="296" stroke="${c}" stroke-width="1" opacity="0.12"/>`;
      for (let i = -300; i <= 820; i += 40)
        l += `<line x1="${i + 296}" y1="0" x2="${i}" y2="296" stroke="${c}" stroke-width="1" opacity="0.12"/>`;
      return l;
    },
  },




  {
    id: "zigzag",
    label: "Zigzag",
    preview: (c) => {
      let p = "";
      for (let row = 0; row < 4; row++) {
        const y = 6 + row * 12;
        let d = `M0 ${y}`;
        for (let x = 0; x <= 88; x += 11)
          d += ` L${x + 5.5} ${y - 5} L${x + 11} ${y}`;
        p += `<path d="${d}" fill="none" stroke="${c}" stroke-width="1.5" opacity="1"/>`;
      }
      return p;
    },
    render: (c) => {
      let p = "";
      for (let row = 0; row < 8; row++) {
        const y = 18 + row * 37;
        let d = `M0 ${y}`;
        for (let x = 0; x <= 520; x += 40)
          d += ` L${x + 20} ${y - 15} L${x + 40} ${y}`;
        p += `<path d="${d}" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.16"/>`;
      }
      return p;
    },
  },



  {
    id: "plusses",
    label: "Cruzes",
    preview: (c) => {
      let s = "";
      for (let x = 11; x <= 77; x += 22)
        for (let y = 10; y <= 40; y += 15) {
          s += `<line x1="${x - 5}" y1="${y}" x2="${x + 5}" y2="${y}" stroke="${c}" stroke-width="1.5" opacity="1"/>`;
          s += `<line x1="${x}" y1="${y - 5}" x2="${x}" y2="${y + 5}" stroke="${c}" stroke-width="1.5" opacity="1"/>`;
        }
      return s;
    },
    render: (c) => {
      let s = "";
      for (let x = 32; x <= 488; x += 48)
        for (let y = 32; y <= 264; y += 48) {
          s += `<line x1="${x - 12}" y1="${y}" x2="${x + 12}" y2="${y}" stroke="${c}" stroke-width="1.5" opacity="0.18"/>`;
          s += `<line x1="${x}" y1="${y - 12}" x2="${x}" y2="${y + 12}" stroke="${c}" stroke-width="1.5" opacity="0.18"/>`;
        }
      return s;
    },
  },

  {
    id: "concentric",
    label: "Concêntr.",
    preview: (c) =>
      `<circle cx="44" cy="25" r="8" fill="none" stroke="${c}" stroke-width="1.5" opacity="1"/>
       <circle cx="44" cy="25" r="16" fill="none" stroke="${c}" stroke-width="1" opacity="0.8"/>
       <circle cx="44" cy="25" r="24" fill="none" stroke="${c}" stroke-width="1" opacity="0.5"/>`,
    render: (c) => {
      let s = "";
      const centers = [[130, 148], [390, 148], [260, 148]];
      for (const [cx, cy] of centers)
        for (let r = 30; r <= 200; r += 30)
          s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c}" stroke-width="1" opacity="${(0.18 - r * 0.0007).toFixed(3)}"/>`;
      return s;
    },
  },


  {
    id: "confetti",
    label: "Confete",
    preview: (c) => {
      const rects = [[10, 8, 8, 4, 15], [28, 20, 6, 3, -10], [50, 10, 9, 4, 30], [68, 30, 7, 3, -20], [20, 38, 8, 3, 10], [44, 35, 6, 4, 25]];
      return rects.map(([x, y, w, h, r]) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="${c}" opacity="0.7" transform="rotate(${r} ${x + w / 2} ${y + h / 2})"/>`
      ).join("");
    },
    render: (c) => {
      const seed = [[52, 40], [156, 90], [260, 55], [364, 110], [468, 70], [104, 170], [208, 140], [312, 190], [416, 155], [80, 240], [180, 210], [310, 250], [430, 230], [520, 180], [140, 280], [370, 270]];
      const angles = [15, -20, 30, -10, 25, -30, 10, 20, -15, 35, -25, 5, -35, 18, -12, 28];
      return seed.map(([x, y], i) =>
        `<rect x="${x}" y="${y}" width="28" height="10" rx="2" fill="${c}" opacity="0.12" transform="rotate(${angles[i]} ${x + 14} ${y + 5})"/>`
      ).join("");
    },
  },


  {
    id: "noise",
    label: "Pontilhado",
    preview: (c) => {
      const pts = [[8, 8], [20, 15], [35, 6], [50, 18], [65, 9], [78, 20], [12, 30], [30, 38], [48, 28], [62, 40], [75, 33], [15, 45], [45, 45], [70, 48]];
      return pts.map(([x, y]) =>
        `<circle cx="${x}" cy="${y}" r="1.8" fill="${c}" opacity="${(0.4 + Math.sin(x * y) * 0.3).toFixed(2)}"/>`
      ).join("");
    },
    render: (c) => {
      const pts: [number, number][] = [];
      for (let x = 20; x <= 500; x += 22)
        for (let y = 20; y <= 276; y += 22)
          if ((x * 7 + y * 13) % 3 !== 0) pts.push([x + (x % 11) - 5, y + (y % 7) - 3]);
      return pts.map(([x, y]) =>
        `<circle cx="${x}" cy="${y}" r="2" fill="${c}" opacity="0.1"/>`
      ).join("");
    },
  },

  {
    id: "corners",
    label: "Cantos",
    preview: (c) =>
      `<path d="M0 20 L0 0 L20 0" fill="none" stroke="${c}" stroke-width="2" opacity="1"/>
       <path d="M68 0 L88 0 L88 20" fill="none" stroke="${c}" stroke-width="2" opacity="1"/>
       <path d="M0 30 L0 50 L20 50" fill="none" stroke="${c}" stroke-width="2" opacity="1"/>
       <path d="M68 50 L88 50 L88 30" fill="none" stroke="${c}" stroke-width="2" opacity="1"/>`,
    render: (c) =>
      `<path d="M0 80 L0 0 L80 0" fill="none" stroke="${c}" stroke-width="2" opacity="0.22"/>
       <path d="M0 140 L0 0 L140 0" fill="none" stroke="${c}" stroke-width="1" opacity="0.10"/>
       <path d="M440 0 L520 0 L520 80" fill="none" stroke="${c}" stroke-width="2" opacity="0.22"/>
       <path d="M380 0 L520 0 L520 140" fill="none" stroke="${c}" stroke-width="1" opacity="0.10"/>
       <path d="M0 216 L0 296 L80 296" fill="none" stroke="${c}" stroke-width="2" opacity="0.22"/>
       <path d="M0 156 L0 296 L140 296" fill="none" stroke="${c}" stroke-width="1" opacity="0.10"/>
       <path d="M440 296 L520 296 L520 216" fill="none" stroke="${c}" stroke-width="2" opacity="0.22"/>
       <path d="M380 296 L520 296 L520 156" fill="none" stroke="${c}" stroke-width="1" opacity="0.10"/>`,
  },


  {
    id: "scanlines",
    label: "Scanlines",
    preview: (c) => {
      let l = "";
      for (let y = 4; y <= 50; y += 8)
        l += `<line x1="0" y1="${y}" x2="88" y2="${y}" stroke="${c}" stroke-width="3" opacity="0.5"/>`;
      return l;
    },
    render: (c) => {
      let l = "";
      for (let y = 12; y <= 296; y += 20)
        l += `<line x1="0" y1="${y}" x2="520" y2="${y}" stroke="${c}" stroke-width="8" opacity="0.06"/>`;
      return l;
    },
  },


  {
    id: "diamonds",
    label: "Losangos",
    preview: (c) => {
      let s = "";
      const positions = [[22, 12], [55, 12], [38, 32], [71, 32], [8, 35]];
      for (const [x, y] of positions)
        s += `<polygon points="${x},${y - 8} ${x + 7},${y} ${x},${y + 8} ${x - 7},${y}" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.9"/>`;
      return s;
    },
    render: (c) => {
      let s = "";
      for (let col = 0; col <= 14; col++)
        for (let row = 0; row <= 8; row++) {
          const x = col * 40 + (row % 2 === 0 ? 0 : 20);
          const y = row * 37;
          s += `<polygon points="${x},${y - 15} ${x + 15},${y} ${x},${y + 15} ${x - 15},${y}" fill="none" stroke="${c}" stroke-width="1" opacity="0.13"/>`;
        }
      return s;
    },
  },

  {
    id: "spirograph",
    label: "Espiral",
    preview: (c) => {
      let p = "";
      const cx = 44, cy = 25;
      for (let r = 5; r <= 22; r += 5) {
        let d = "";
        for (let a = 0; a <= 360; a += 10) {
          const rad = (a * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          d += `${a === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        p += `<path d="${d}Z" fill="none" stroke="${c}" stroke-width="1" opacity="${(1 - r * 0.03).toFixed(2)}"/>`;
      }
      return p;
    },
    render: (c) => {
      let p = "";
      const centers: [number, number][] = [[130, 148], [390, 148], [260, 75], [260, 221]];
      for (const [cx, cy] of centers)
        for (let r = 20; r <= 110; r += 18) {
          let d = "";
          for (let a = 0; a <= 360; a += 6) {
            const rad = (a * Math.PI) / 180;
            const x = cx + r * Math.cos(rad);
            const y = cy + r * Math.sin(rad);
            d += `${a === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
          }
          p += `<path d="${d}Z" fill="none" stroke="${c}" stroke-width="1" opacity="${(0.14 - r * 0.001).toFixed(3)}"/>`;
        }
      return p;
    },
  },

  {
    id: "bricks",
    label: "Tijolos",
    preview: (c) => {
      let s = "";
      for (let row = 0; row < 4; row++) {
        const y = row * 13;
        const offset = row % 2 === 0 ? 0 : 11;
        for (let x = -11; x <= 88; x += 22)
          s += `<rect x="${x + offset}" y="${y + 1}" width="20" height="10" rx="1" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.9"/>`;
      }
      return s;
    },
    render: (c) => {
      let s = "";
      for (let row = 0; row <= 8; row++) {
        const y = row * 37;
        const offset = row % 2 === 0 ? 0 : 40;
        for (let x = -40; x <= 520; x += 80)
          s += `<rect x="${x + offset}" y="${y + 2}" width="76" height="31" rx="2" fill="none" stroke="${c}" stroke-width="1" opacity="0.13"/>`;
      }
      return s;
    },
  },

  {
    id: "starfield",
    label: "Estrelas",
    preview: (c) => {
      const pts = [[10, 8], [25, 20], [40, 5], [58, 15], [72, 28], [15, 35], [33, 42], [50, 32], [68, 40], [80, 12], [44, 25]];
      return pts.map(([x, y], i) => {
        const r = i % 3 === 0 ? 2.5 : i % 3 === 1 ? 1.5 : 1;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${i % 2 === 0 ? 1 : 0.6}"/>`;
      }).join("");
    },
    render: (c) => {
      const stars: [number, number, number][] = [
        [45, 30, 3], [130, 80, 2], [210, 45, 3.5], [300, 110, 2], [390, 60, 3], [470, 90, 2.5],
        [80, 160, 2], [170, 200, 3], [255, 170, 2], [340, 195, 3.5], [430, 165, 2], [510, 200, 2.5],
        [60, 250, 3], [150, 270, 2], [240, 240, 3], [330, 265, 2.5], [420, 250, 2], [490, 275, 3],
        [110, 120, 1.5], [200, 130, 2], [285, 100, 1.5], [375, 135, 2], [460, 120, 1.5],
        [30, 80, 1.5], [500, 30, 2], [260, 280, 1.5], [100, 290, 2], [420, 285, 1.5],
      ];
      return stars.map(([x, y, r]) =>
        `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${(0.08 + r * 0.03).toFixed(2)}"/>`
      ).join("");
    },
  },

  {
    id: "weave",
    label: "Trançado",
    preview: (c) => {
      let s = "";
      for (let i = 0; i < 5; i++) {
        const y = 5 + i * 10;
        s += `<path d="M0 ${y} Q11 ${y - 5} 22 ${y} Q33 ${y + 5} 44 ${y} Q55 ${y - 5} 66 ${y} Q77 ${y + 5} 88 ${y}" fill="none" stroke="${c}" stroke-width="2" opacity="0.9"/>`;
      }
      for (let i = 0; i < 5; i++) {
        const x = 9 + i * 17;
        s += `<path d="M${x} 0 Q${x - 4} 12 ${x} 25 Q${x + 4} 38 ${x} 50" fill="none" stroke="${c}" stroke-width="2" opacity="0.6"/>`;
      }
      return s;
    },
    render: (c) => {
      let s = "";
      for (let i = 0; i < 10; i++) {
        const y = 15 + i * 30;
        s += `<path d="M0 ${y} Q65 ${y - 18} 130 ${y} Q195 ${y + 18} 260 ${y} Q325 ${y - 18} 390 ${y} Q455 ${y + 18} 520 ${y}" fill="none" stroke="${c}" stroke-width="2" opacity="0.12"/>`;
      }
      for (let i = 0; i < 8; i++) {
        const x = 32 + i * 65;
        s += `<path d="M${x} 0 Q${x - 20} 74 ${x} 148 Q${x + 20} 222 ${x} 296" fill="none" stroke="${c}" stroke-width="2" opacity="0.08"/>`;
      }
      return s;
    },
  },

  {
    id: "arrows",
    label: "Setas",
    preview: (c) => {
      let s = "";
      for (let row = 0; row < 3; row++)
        for (let col = 0; col < 4; col++) {
          const x = 11 + col * 22;
          const y = 10 + row * 16;
          s += `<polyline points="${x - 6},${y - 4} ${x},${y} ${x - 6},${y + 4}" fill="none" stroke="${c}" stroke-width="1.5" stroke-linejoin="round" opacity="0.9"/>`;
        }
      return s;
    },
    render: (c) => {
      let s = "";
      for (let row = 0; row <= 7; row++)
        for (let col = 0; col <= 12; col++) {
          const x = 20 + col * 40;
          const y = 20 + row * 40;
          s += `<polyline points="${x - 10},${y - 8} ${x},${y} ${x - 10},${y + 8}" fill="none" stroke="${c}" stroke-width="1.2" stroke-linejoin="round" opacity="0.13"/>`;
        }
      return s;
    },
  },

  {
    id: "bubbles",
    label: "Bolhas",
    preview: (c) => {
      const circles = [[15, 15, 10], [40, 10, 7], [68, 18, 9], [25, 35, 8], [55, 38, 11], [78, 40, 6], [10, 42, 5]];
      return circles.map(([x, y, r]) =>
        `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="1.5" opacity="${(0.5 + r * 0.03).toFixed(2)}"/>`
      ).join("");
    },
    render: (c) => {
      const circles: [number, number, number][] = [
        [60, 60, 45], [180, 40, 30], [310, 70, 55], [450, 50, 35], [500, 160, 25],
        [30, 180, 35], [130, 200, 50], [250, 170, 28], [370, 210, 45], [480, 230, 32],
        [80, 265, 30], [200, 260, 42], [330, 280, 25], [440, 270, 38], [520, 90, 20],
        [160, 120, 22], [290, 130, 35], [410, 100, 28],
      ];
      return circles.map(([x, y, r]) =>
        `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="1.2" opacity="${(0.04 + r * 0.002).toFixed(3)}"/>`
      ).join("");
    },
  },

  {
    id: "topography",
    label: "Topografia",
    preview: (c) =>
      `<path d="M0 20 Q15 10 30 20 Q45 30 60 18 Q75 8 88 22" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.9"/>
       <path d="M0 32 Q20 18 35 28 Q50 38 65 26 Q80 16 88 30" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.7"/>
       <path d="M0 44 Q22 28 40 38 Q58 48 75 34 Q85 26 88 40" fill="none" stroke="${c}" stroke-width="1" opacity="0.5"/>`,
    render: (c) =>
      `<path d="M0 60 Q80 20 180 55 Q280 90 380 45 Q460 15 520 50" fill="none" stroke="${c}" stroke-width="2" opacity="0.14"/>
       <path d="M0 95 Q90 55 190 85 Q290 115 390 70 Q460 40 520 80" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.12"/>
       <path d="M0 130 Q100 90 200 118 Q300 146 400 100 Q470 68 520 110" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.10"/>
       <path d="M0 165 Q110 125 210 152 Q310 179 410 135 Q475 105 520 140" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.09"/>
       <path d="M0 200 Q120 160 220 188 Q320 216 420 170 Q480 140 520 172" fill="none" stroke="${c}" stroke-width="1.2" opacity="0.08"/>
       <path d="M0 235 Q130 195 230 224 Q330 253 430 207 Q485 178 520 208" fill="none" stroke="${c}" stroke-width="1" opacity="0.07"/>
       <path d="M0 270 Q140 230 240 260 Q340 290 440 244 Q490 216 520 244" fill="none" stroke="${c}" stroke-width="1" opacity="0.06"/>`,
  },












];

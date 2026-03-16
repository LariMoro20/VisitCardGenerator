export function useCardExport() {
  const isGenerating = ref(false);

  async function exportPDF(
    frontEl: HTMLElement,
    backEl: HTMLElement,
    fileName: string,
  ) {
    isGenerating.value = true;
    try {
      const [{ toPng }, { jsPDF }] = await Promise.all([
        import("html-to-image"),
        import("jspdf").then((m) => ({ jsPDF: m.jsPDF })),
      ]);

      await document.fonts.ready;

      const prevFront = frontEl.style.display;
      const prevBack = backEl.style.display;
      frontEl.style.display = "flex";
      backEl.style.display = "block";

      await new Promise((r) => setTimeout(r, 100));

      const [pngFront, pngBack] = await Promise.all([
        toPng(frontEl, { pixelRatio: 3, skipFonts: true }),
        toPng(backEl, { pixelRatio: 3, skipFonts: true }),
      ]);

      frontEl.style.display = prevFront;
      backEl.style.display = prevBack;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [88.9, 50.8],
      });
      pdf.addImage(pngFront, "PNG", 0, 0, 88.9, 50.8);
      pdf.addPage();
      pdf.addImage(pngBack, "PNG", 0, 0, 88.9, 50.8);

      pdf.save(`${fileName}-visitcard.pdf`);
    } finally {
      isGenerating.value = false;
    }
  }

  return { isGenerating, exportPDF };
}

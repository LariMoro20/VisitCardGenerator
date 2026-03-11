<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div
      class="flex flex-col md:grid md:grid-cols-[390px_1fr] flex-1 min-h-0 overflow-hidden"
    >
      <div
        class="max-h-[35vh] md:max-h-none md:h-full order-2 md:order-1 overflow-hidden border-t md:border-t-0 border-[var(--color-secondary)]"
      >
        <EditorForm
          v-model:form="form"
          v-model:logo-preview="logoPreview"
          v-model:bg-images="bgImages"
          :is-generating="isGenerating"
          :form-valid="isFormValid"
          @generate="generatePDF"
        />
      </div>
      <div class="order-1 md:order-2 flex-1 min-h-0 overflow-hidden">
        <EditorCardPreview
          ref="previewRef"
          class="h-full w-full"
          :card-frente-props="cardFrontProps"
          :card-verso-props="cardBackProps"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "editor-layout" });
defineOgImageComponent("OgImageVisitCardOg", {
  title: "Editor de Cartão",
  description:
    "Personalize cores, logo e padrões. Baixe o PDF pronto para impressão.",
});

useSeoMeta({
  title: "Editor | VisitCardGenerator",
  description:
    "Personalize cores, logo, padrões geométricos e imagem de fundo. Baixe seu cartão de visita em PDF com frente e verso em segundos.",
  ogTitle: "Editor | VisitCardGenerator",
  ogDescription:
    "Personalize cores, logo, padrões geométricos e imagem de fundo. Baixe seu cartão de visita em PDF com frente e verso em segundos.",
});

const form = reactive({
  companyName: "",
  description: "",
  phone: "",
  email: "",
  website: "",
  backgroundColor: "#1a1a2e",
  textColor: "#e8e4dc",
  accentColor: "#c9a96e",
  backColor: "#111827",
  pattern: "circles",
  patternOnFront: false,
  bgOpacity: 0.55,
  alignment: "custom" as "left" | "center" | "right" | "custom",
  logoSize: "md" as "sm" | "md" | "lg",
});

const logoPreview = ref<string | null>(null);
const bgImages = ref<Record<string, string | null>>({
  front: null,
  back: null,
});
const isGenerating = ref(false);
const previewRef = ref<{
  cardFrenteRef: { $el: HTMLElement } | null;
  cardVersoRef: { $el: HTMLElement } | null;
} | null>(null);

const cardFrontProps = computed(() => ({
  companyName: form.companyName,
  description: form.description,
  phone: form.phone,
  email: form.email,
  website: form.website,
  backgroundColor: form.backgroundColor,
  textColor: form.textColor,
  accentColor: form.accentColor,
  bgImage: bgImages.value.front,
  bgOpacity: form.bgOpacity,
  logo: logoPreview.value,
  pattern: form.patternOnFront ? form.pattern : "solid",
  alignment: form.alignment,
  logoSize: form.logoSize,
}));

const cardBackProps = computed(() => ({
  companyName: form.companyName,
  description: form.description,
  backgroundColor: form.backColor,
  textColor: form.textColor,
  accentColor: form.accentColor,
  bgImage: bgImages.value.back,
  bgOpacity: form.bgOpacity,
  logo: logoPreview.value,
  pattern: form.pattern,
  logoSize: form.logoSize,
}));

const isFormValid = computed(() => form.companyName.trim().length > 0);

async function generatePDF() {
  isGenerating.value = true;
  try {
    const [{ toPng }, { jsPDF }] = await Promise.all([
      import("html-to-image"),
      import("jspdf").then((m) => ({ jsPDF: m.jsPDF })),
    ]);

    await document.fonts.ready;

    const frontEl = previewRef.value?.cardFrenteRef?.$el as HTMLElement;
    const backEl = previewRef.value?.cardVersoRef?.$el as HTMLElement;

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

    const name = (form.companyName || "cartao")
      .toLowerCase()
      .replace(/\s+/g, "-");
    pdf.save(`${name}-visitcard.pdf`);
  } finally {
    isGenerating.value = false;
  }
}
</script>

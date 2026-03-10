<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <div
      class="flex flex-col md:grid md:grid-cols-[390px_1fr] flex-1 min-h-0 overflow-hidden"
    >
      <div
        class="max-h-[25vh] md:max-h-none overflow-y-auto overflow-x-hidden border-b md:border-b-0 border-[var(--color-secondary)]"
      >
        <EditorForm
          v-model:form="form"
          v-model:logo-preview="logoPreview"
          v-model:bg-images="bgImages"
          :gerando="gerando"
          :form-valido="formValido"
          @gerar="gerarPDF"
        />
      </div>
      <div class="flex-1 min-h-0 overflow-hidden">
        <EditorCardPreview
          ref="previewRef"
          class="h-full w-full"
          :card-frente-props="cardFrenteProps"
          :card-verso-props="cardVersoProps"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "editor-layout" });

defineOgImageComponent("NuxtSeo", {
  title: "Editor de Cartão de Visita",
  description: "Personalize e baixe seu cartão de visita em PDF agora mesmo.",
  theme: "#111111",
  colorMode: "dark",
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
  empresa: "",
  descricao: "",
  telefone: "",
  email: "",
  site: "",
  corFundo: "#1a1a2e",
  corTexto: "#e8e4dc",
  corDestaque: "#c9a96e",
  corVerso: "#111827",
  padrao: "circles",
  padraoNaFrente: false,
  bgOpacity: 0.55,
});

const logoPreview = ref<string | null>(null);
const bgImages = ref<Record<string, string | null>>({
  frente: null,
  verso: null,
});
const gerando = ref(false);
const previewRef = ref<{
  cardFrenteRef: { $el: HTMLElement } | null;
  cardVersoRef: { $el: HTMLElement } | null;
} | null>(null);

const cardFrenteProps = computed(() => ({
  empresa: form.empresa,
  descricao: form.descricao,
  telefone: form.telefone,
  email: form.email,
  site: form.site,
  corFundo: form.corFundo,
  corTexto: form.corTexto,
  corDestaque: form.corDestaque,
  bgImage: bgImages.value.frente,
  bgOpacity: form.bgOpacity,
  logo: logoPreview.value,
  padrao: form.padraoNaFrente ? form.padrao : "solid",
}));

const cardVersoProps = computed(() => ({
  empresa: form.empresa,
  descricao: form.descricao,
  corFundo: form.corVerso,
  corTexto: form.corTexto,
  corDestaque: form.corDestaque,
  bgImage: bgImages.value.verso,
  bgOpacity: form.bgOpacity,
  logo: logoPreview.value,
  padrao: form.padrao,
}));

const formValido = computed(() => form.empresa.trim().length > 0);

async function gerarPDF() {
  gerando.value = true;
  try {
    const [{ toPng }, { jsPDF }] = await Promise.all([
      import("html-to-image"),
      import("jspdf").then((m) => ({ jsPDF: m.jsPDF })),
    ]);

    await document.fonts.ready;

    const frenteEl = previewRef.value?.cardFrenteRef?.$el as HTMLElement;
    const versoEl = previewRef.value?.cardVersoRef?.$el as HTMLElement;

    const prevFrente = frenteEl.style.display;
    const prevVerso = versoEl.style.display;
    frenteEl.style.display = "flex";
    versoEl.style.display = "block";

    await new Promise((r) => setTimeout(r, 100));

    const [pngFrente, pngVerso] = await Promise.all([
      toPng(frenteEl, { pixelRatio: 3, skipFonts: true }),
      toPng(versoEl, { pixelRatio: 3, skipFonts: true }),
    ]);

    frenteEl.style.display = prevFrente;
    versoEl.style.display = prevVerso;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [88.9, 50.8],
    });
    pdf.addImage(pngFrente, "PNG", 0, 0, 88.9, 50.8);
    pdf.addPage();
    pdf.addImage(pngVerso, "PNG", 0, 0, 88.9, 50.8);

    const nome = (form.empresa || "cartao").toLowerCase().replace(/\s+/g, "-");
    pdf.save(`${nome}-cartao-de-visita.pdf`);
  } finally {
    gerando.value = false;
  }
}
</script>

<template>
  <div
    class="flex flex-col h-screen overflow-hidden bg-[#0f0f0f] text-[#e8e4dc]"
  >
    <header
      class="px-10 py-5 border-b border-[#2a2a2a] flex items-center justify-between gap-4"
    >
      <NuxtLink
        to="/"
        class="flex items-center shrink-0 cursor-pointer"
        aria-label="Ir para página inicial"
      >
        <UColorModeImage
          light="/images/genlogo.png"
          dark="/images/genlogo_white.png"
          :height="42"
          format="webp"
          class="h-[42px]"
        />
      </NuxtLink>
      <h1 class="font-serif text-2xl font-normal">
        Gerador de Cartão de Visita
      </h1>
      <span class="text-[0.78rem] text-[#6b6662] tracking-[.12em] uppercase"
        >PDF frente e verso</span
      >
    </header>

    <div class="grid grid-cols-[390px_1fr] flex-1 min-h-0 overflow-hidden">
      <div class="min-h-0 overflow-y-auto">
        <EditorForm
          v-model:form="form"
          :logo-preview="logoPreview"
          :bg-images="bgImages"
          :gerando="gerando"
          :form-valido="formValido"
          @update:logo-preview="logoPreview = $event"
          @update:bg-images="Object.assign(bgImages, $event)"
          @gerar="gerarPDF"
        />
      </div>
      <div class="min-h-0">
        <EditorPreview
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
import { ref, reactive, computed } from "vue";

definePageMeta({ layout: false });

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
const bgImages = reactive<Record<string, string | null>>({
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
  bgImage: bgImages.frente,
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
  bgImage: bgImages.verso,
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

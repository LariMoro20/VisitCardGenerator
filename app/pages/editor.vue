<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div
      class="flex flex-col md:grid md:grid-cols-[390px_1fr] flex-1 min-h-0 overflow-hidden"
    >
      <div
        class="max-h-[35vh] md:max-h-none md:h-full order-2 md:order-1 overflow-hidden border-t md:border-t-0 border-[var(--color-secondary)]"
      >
        <EditorForm :is-generating="isGenerating" @generate="handleGenerate" />
      </div>
      <div class="order-1 md:order-2 flex-1 min-h-0 overflow-hidden">
        <EditorCardPreview
          ref="previewRef"
          class="h-full w-full"
          :card-frente-props="store.cardFrontProps"
          :card-verso-props="store.cardBackProps"
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

const store = useEditorStore();
const { isGenerating, exportPDF } = useCardExport();

const previewRef = ref<{
  cardFrenteRef: { $el: HTMLElement } | null;
  cardVersoRef: { $el: HTMLElement } | null;
} | null>(null);

onMounted(() => store.load());

async function handleGenerate() {
  const frontEl = previewRef.value?.cardFrenteRef?.$el as HTMLElement;
  const backEl = previewRef.value?.cardVersoRef?.$el as HTMLElement;
  const fileName = (store.form.companyName || "cartao")
    .toLowerCase()
    .replace(/\s+/g, "-");
  await exportPDF(frontEl, backEl, fileName);
}
</script>

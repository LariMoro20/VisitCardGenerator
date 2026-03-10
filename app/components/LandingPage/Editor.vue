<template>
  <UContainer id="editor" class="scroll-mt-20 min-h-screen">
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <div class="py-8 lg:py-12 text-center flex flex-col items-center gap-4">
        <h2
          class="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
        >
          Conheça o editor
        </h2>
        <p class="text-[var(--color-primary)]/80 dark:text-white/80 text-base">
          Cada detalhe pensado para você. Escolha cores, adicione seu logotipo,
          defina padrões geométricos e imagens de fundo. Tudo em
          <b>tempo real</b>, com <b>preview instantâneo</b>. Quando estiver
          pronto, baixe o PDF com frente e verso no tamanho exato para impressão
          profissional.
        </p>
      </div>
    </AnimationsReveal>
    <UPageGrid>
      <AnimationsReveal
        v-for="(card, i) in cards"
        :key="i"
        type="fade-slide"
        direction="up"
        :delay="i * 0.5"
        class="h-full"
      >
        <UPageCard v-bind="card" class="h-full" @click="selectedIndex = i">
          <nuxt-img
            v-if="card.image"
            :src="card.image.path"
            :alt="card.alt"
            class="w-full"
            loading="lazy"
          />
        </UPageCard>
      </AnimationsReveal>
    </UPageGrid>
  </UContainer>

  <LandingPageLightbox v-if="cards" v-model="selectedIndex" :images="images" />
</template>

<script setup lang="ts">
const cards = ref([
  {
    title: "Identidade e contatos",
    description:
      "Adicione logotipo, nome da empresa, descrição e informações de contato como telefone, e-mail e site.",
    class: "hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer",
    alt: "Editor parte 1: Informações principais e contatos",
    image: { path: "/images/app_assets/step_1.png" },
    orientation: "vertical" as const,
  },
  {
    title: "Cores e estilo",
    description:
      "Personalize as cores do cartão, escolha um padrão geométrico e adicione imagem de fundo com controle de opacidade.",
    class: "hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer",
    alt: "Editor parte 2: Estilo do cartão",
    image: { path: "/images/app_assets/step_2.png" },
    orientation: "vertical" as const,
  },
  {
    title: "Personalize o verso",
    description:
      "Configure o verso com logo, nome e padrão próprio. Baixe o PDF com frente e verso prontos para impressão.",
    class: "hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer",
    alt: "Editor parte 3: Personalize o verso",
    image: { path: "/images/app_assets/step_3.png" },
    orientation: "vertical" as const,
  },
]);
const images = computed(() => cards.value.map((c) => c.image.path));
const selectedIndex = ref<number | null>(null);
</script>

<template>
  <UContainer id="editor">
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <UPageCTA
        title="Conheça o editor"
        description="Nosso editor possui todas as formas de edição que você precisa: adicione imagens, contatos, personalize com sua logo, padrões e muito mais!"
        variant="naked"
        :ui="{
          container: 'lg:pb-16',
          title: 'text-primary dark:text-secondary',
          description: 'text-primary/80 dark:text-white/80',
        }"
    /></AnimationsReveal>
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
          /> </UPageCard
      ></AnimationsReveal>
    </UPageGrid>
  </UContainer>
  <LinghtboxGalery v-if="cards" v-model="selectedIndex" :images="images" />
</template>

<script setup lang="ts">
const cards = ref([
  {
    title: "Identidade e contatos",
    description:
      "Adicione logotipo, nome da empresa, descrição e informações de contato como telefone, e-mail e site.",
    class: "hover:bg-neutral-100 cursor-pointer",
    alt: "Editor parte 1: Informações principais e contatos",
    image: { path: "/images/app_assets/step1.png" },
    orientation: "vertical" as const,
  },
  {
    title: "Cores e estilo",
    description:
      "Personalize as cores do cartão, escolha um padrão geométrico e adicione imagem de fundo com controle de opacidade.",
    class: "hover:bg-neutral-100 cursor-pointer",
    alt: "Editor parte 2: Estilo do cartão",
    image: { path: "/images/app_assets/step2.png" },
    orientation: "vertical" as const,
  },
  {
    title: "Personalize o verso",
    description:
      "Configure o verso com logo, nome e padrão próprio. Baixe o PDF com frente e verso prontos para impressão.",
    class: "hover:bg-neutral-100 cursor-pointer",
    alt: "Editor parte 3: Personalize o verso",
    image: { path: "/images/app_assets/step3.png" },
    orientation: "vertical" as const,
  },
]);
const images = computed(() => cards.value.map((c) => c.image.path));
const selectedIndex = ref<number | null>(null);
</script>

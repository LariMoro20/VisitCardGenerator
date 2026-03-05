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
      >
        <UPageCard v-bind="card" @click="selectedIndex = i">
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
    title: "Defina suas informações principais",
    description:
      "Nessa primeira etapa, são definidas as informações sobre a empresa como logotipo, nome, descrição e contatos.",
    class: "hover:bg-neutral-100 cursor-pointer",
    alt: "Editor parte 1: Informações principais e contatos ",
    image: {
      path: "/images/app_assets/step1.png",
    },
    orientation: "vertical" as const,
  },
  {
    title: "Informe seus contatos",
    description:
      "Na segunda etapa, são definidas as cores do cartão, estilo e imagens de fundo.",
    class: "hover:bg-neutral-100 cursor-pointer",
    alt: "Editor parte 2: Estilo do cartão ",

    image: {
      path: "/images/app_assets/step2.png",
    },
    orientation: "vertical" as const,
  },
  {
    title: "Personalize o verso",
    description:
      "Também é possível personalizar o verso do cartão, com as informações e estilos de sua preferência.",
    class: "hover:bg-neutral-100 cursor-pointer",
    alt: "Editor parte 3: personalize o verso ",

    image: {
      path: "/images/app_assets/step3.png",
    },
    orientation: "vertical" as const,
  },
]);
const images = computed(() => cards.value.map((c) => c.image.path));
const selectedIndex = ref<number | null>(null);
</script>

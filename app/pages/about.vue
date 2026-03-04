<template>
  <div>
    <AppHeader />
    <AppHero id="hero" />
    <AppCards id="cases" />
    <AppStack id="stack" />
    <AppAbout id="about" />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
defineOgImageComponent("NuxtSeo", {
  title: "Lari seo",
  description: "Projeto com Vue, Nuxt e Nuxt UI",
  theme: "#111111",
  colorMode: "dark",
});
</script>

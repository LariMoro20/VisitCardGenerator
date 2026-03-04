<template>
  <div>
    <AppHero id="hero" />
    <AppCards id="editor" />
    <AppStack id="stack" />
    <AppAbout id="author" />
  </div>
</template>

<script setup lang="ts">
defineOgImageComponent("NuxtSeo", {
  title: "VisitCardGenerator",
  description: "Criando seu cartão de visita de forma prática",
  theme: "#111111",
  colorMode: "dark",
});

useSeoMeta({
  titleTemplate: "%s",
  title: "VisitCardGenerator",
  description: "Criando seu cartão de visita de forma prática",
  ogTitle: "VisitCardGenerator — Criado seu cartão de visita de forma prática",
  ogDescription: "Criado seu cartão de visita de forma prática",
});
</script>

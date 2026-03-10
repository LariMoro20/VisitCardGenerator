<template>
  <div>
    <LandingPageHero />
    <LandingPageEditor />
    <LandingPageCard />
    <LandingPageCTA />
    <LandingPageFAQ />
    <LandingPageAuthor />
    <LandingPageProjectStack />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "land-page-layout" });
defineOgImageComponent("OgImageVisitCardOg", {
  title: "VisitCardGenerator",
  description:
    "Crie seu cartão de visita em PDF com frente e verso em segundos.",
});

useSeoMeta({
  titleTemplate: "%s",
  title: "VisitCardGenerator | Cartão de visita em PDF",
  description:
    "Gere cartões de visita profissionais com frente e verso em PDF. Personalize cores, logo, padrões e baixe na hora, sem cadastro.",
  ogTitle: "VisitCardGenerator | Cartão de visita em PDF",
  ogDescription:
    "Gere cartões de visita profissionais com frente e verso em PDF. Personalize cores, logo, padrões e baixe na hora, sem cadastro.",
});
</script>

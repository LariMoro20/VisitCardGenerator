<template>
  <div>
    <LandingPageHeader />
    <LandingPageHero />
    <LandingPageEditor />
    <LandingPageCard />
    <LandingPageProjectStack />
    <LandingPageCTA />
    <LandingPageFAQ />
    <LandingPageAuthor />
    <LandingPageFooter />
  </div>
</template>

<script setup lang="ts">
defineOgImageComponent("NuxtSeo", {
  title: "VisitCardGenerator",
  description:
    "Crie cartões de visita profissionais em PDF, direto no navegador.",
  theme: "#111111",
  colorMode: "dark",
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

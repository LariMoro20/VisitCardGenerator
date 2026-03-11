<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
<script setup>
useSchemaOrg([
  defineOrganization({
    name: "VisitCardGenerator",
    description:
      "Gere cartões de visita profissionais com frente e verso em PDF. Personalize cores, logo, padrões e baixe na hora, sem cadastro.",
    url: "https://visitcard-larisantos.vercel.app/",
    logo: "/android-chrome-512x512.png",
    founder: {
      "@type": "Person",
      name: "Larissa Santos",
      url: "https://github.com/LariMoro20",
    },
    address: {
      addressLocality: "São José",
      addressRegion: "SC",
      addressCountry: "BR",
    },
  }),
  defineWebSite({
    name: "VisitCardGenerator",
    description:
      "Gere cartões de visita profissionais com frente e verso em PDF. Personalize cores, logo, padrões e baixe na hora, sem cadastro.",
    inLanguage: "pt-BR",
  }),
  defineWebPage({
    name: "VisitCardGenerator | Cartão de visita em PDF",
    description:
      "Gere cartões de visita profissionais com frente e verso em PDF.",
  }),
]);
</script>

<template>
  <UApp>
    <NuxtLayout>
      <main>
        <NuxtPage />
      </main>
    </NuxtLayout>
  </UApp>
</template>
<script setup>
useSchemaOrg([
  defineOrganization({
    name: "VisitCard",
    description: "Criado seu cartão de visita de forma prática",
    url: "https://visitcard.vercel.app//",
    logo: "/android-chrome-512x512.png",
    address: {
      addressLocality: "São José",
      addressRegion: "SC",
      addressCountry: "BR",
    },
  }),
  defineWebSite({
    name: "VisitCard",
    description: "Criado seu cartão de visita de forma prática",
  }),
]);
</script>

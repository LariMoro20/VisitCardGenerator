<template>
  <UHeader
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300 main-header"
  >
    <template #title>
      <NuxtLink
        to="/"
        class="flex items-center shrink-0 cursor-pointer"
        aria-label="Ir para página inicial"
      >
        <UColorModeImage
          light="/images/genlogo.png"
          dark="/images/genlogo_white.png"
          :height="42"
          format="webp"
          class="h-[42px]"
        />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items">
      <template #item="{ item }">
        <UButton
          v-if="item.key === 'editor-cta'"
          :to="item.to"
          variant="solid"
          size="md"
          class="font-semibold"
          :color="isDark ? 'secondary' : 'primary'"
        >
          {{ item.label }}
        </UButton>

        <NuxtLink v-else :to="item.to" class="px-3 py-2 text-sm font-medium">
          {{ item.label }}
        </NuxtLink>
      </template>
    </UNavigationMenu>

    <template #right>
      <UColorModeButton />
    </template>
<<<<<<< HEAD
=======

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
>>>>>>> 3865fe2 (Send project to github)
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const items = computed<NavigationMenuItem[]>(() => [
  { label: "Inicio", to: "#hero" },
  { label: "Sobre o editor", to: "#editor" },
  { label: "Stack", to: "#stack" },
  { label: "Autora", to: "#author" },

  {
    label: "Github",
    to: "https://github.com/LariMoro20",
    target: "_blank",
    icon: "mdi:github",
  },
  { label: "Acessar o Editor", to: "/editor", key: "editor-cta" },
]);
</script>

<template>
  <!-- HEADER -->
  <header
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      isScrolled
        ? 'backdrop-blur-xl border-b border-[var(--color-secondary)]'
        : 'bg-transparent border-b border-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 h-[68px] flex items-center">
      <NuxtLink
        to="/"
        aria-label="Ir para página inicial"
        class="flex items-center shrink-0 cursor-pointer"
      >
        <UColorModeImage
          light="/images/genlogo.png"
          dark="/images/genlogo_white.png"
          :height="42"
          format="webp"
          class="h-10.5"
        />
      </NuxtLink>

      <div class="flex-1" />

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :target="link.target"
          class="text-sm uppercase tracking-[0.1em] text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Icon v-if="link.icon" :name="link.icon" size="16" />
          {{ link.label }}
        </NuxtLink>

        <UButton
          to="/editor"
          size="md"
          class="font-semibold"
          :color="isDark ? 'secondary' : 'primary'"
        >
          Acessar o Editor
        </UButton>
      </nav>

      <UColorModeButton class="ml-4" />

      <UButton
        class="md:hidden ml-2 cursor-pointer"
        variant="ghost"
        aria-label="Abrir menu"
        icon
        @click="openDrawer"
      >
        <Icon name="i-lucide-menu" size="22" />
      </UButton>
    </div>
  </header>

  <div
    v-if="drawerOpen"
    class="text-primary dark:text-secondary z-[90] md:hidden"
    @click="closeDrawer"
  />

  <aside
    :class="[
      'fixed top-0 right-0 h-full w-[280px] z-[100] transform transition-transform duration-300 md:hidden',
      drawerOpen ? 'translate-x-0' : 'translate-x-full',
      isDark
        ? 'bg-[var(--color-background-dark)]'
        : 'bg-[var(--color-background-light)]',
    ]"
  >
    <div class="flex flex-col h-full">
      <div
        class="flex items-center justify-between px-6 h-[68px] border-b border-[var(--color-secondary)]"
      >
        <UColorModeImage
          light="/images/genlogo.png"
          dark="/images/genlogo_white.png"
          :height="36"
          format="webp"
        />
        <UButton
          variant="ghost"
          aria-label="Fechar menu"
          icon
          @click="closeDrawer"
        >
          <Icon name="i-lucide-x" size="20" />
        </UButton>
      </div>

      <div class="flex-1 px-3 py-4 space-y-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :target="link.target"
          class="w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm uppercase tracking-[0.1em] text-[var(--color-text)] hover:bg-[var(--color-secondary)]/10 transition-colors cursor-pointer"
          @click="closeDrawer"
        >
          <span class="flex items-center gap-2">
            <Icon v-if="link.icon" :name="link.icon" size="18" />
            {{ link.label }}
          </span>
          <Icon
            name="i-lucide-arrow-right"
            class="text-[var(--color-secondary)]"
            size="16"
          />
        </NuxtLink>
      </div>

      <div class="p-4 border-t border-[var(--color-secondary)]">
        <UButton
          to="/editor"
          block
          class="font-semibold"
          :color="isDark ? 'secondary' : 'primary'"
          @click="closeDrawer"
        >
          Acessar o Editor
        </UButton>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const drawerOpen = ref(false);
const isScrolled = ref(false);

const navLinks = [
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
];

function openDrawer() {
  drawerOpen.value = true;
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  drawerOpen.value = false;
  document.body.style.overflow = "";
}

function onScroll() {
  isScrolled.value = window.scrollY > 50;
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

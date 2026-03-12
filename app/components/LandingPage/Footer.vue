<template>
  <UFooter>
    <UButton
      aria-label="Apoie o projeto"
      variant="ghost"
      class="fixed bottom-20 right-6 z-50 group cursor-pointer font-semibold rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)] dark:bg-[var(--color-secondary)] dark:hover:bg-[var(--color-secondary)] text-white dark:text-[var(--color-primary)]"
      size="lg"
      @click="scrollToAuthor"
    >
      ☕
      <span
        class="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300"
      >
        Apoie o projeto!
      </span>
    </UButton>
    <p class="text-muted text-sm">
      Copyright © {{ new Date().getFullYear() }} Larissa Santos. Todos os
      direitos reservados.
    </p>
  </UFooter>
</template>

<script setup lang="ts">
function scrollToAuthor() {
  document.querySelector("#donate")?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <UPopover side="top" align="end">
    <UButton
      aria-label="Apoie o projeto"
      variant="ghost"
      class="fixed top-15 md:top-auto md:bottom-150 right-6 z-50 group cursor-pointer font-semibold rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)] dark:bg-[var(--color-secondary)] dark:hover:bg-[var(--color-secondary)] text-white dark:text-[var(--color-primary)]"
      size="lg"
    >
      ☕
      <span
        class="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300"
      >
        Apoie o projeto!
      </span>
    </UButton>

    <template #content>
      <div
        class="bg-[var(--color-primary)] dark:bg-[var(--color-secondary)]/5 max-w-xs w-72 rounded-lg shadow-lg"
        style="max-width: 320px"
      >
        <p
          class="text-white/90 dark:text-[var(--color-text)]/90 px-4 py-4 text-center"
        >
          Apoie para que o projeto possa seguir crescendo.
        </p>
        <SharedPixSupport size="md" />
      </div>
    </template>
  </UPopover>
</template>

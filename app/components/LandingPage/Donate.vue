<template>
  <UPageSection
    id="donate"
    class="bg-[var(--color-primary)] dark:bg-[var(--color-secondary)]/5 border-y border-[var(--color-secondary)]/20 dark:border-[var(--color-secondary)]/10"
  >
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <div class="flex flex-col items-center gap-8 text-center">
        <div class="flex flex-col gap-3">
          <span class="text-4xl">☕</span>
          <h2
            class="text-2xl lg:text-3xl font-bold text-[var(--color-secondary)] dark:text-[var(--color-secondary)]"
          >
            Esse projeto é gratuito e feito com muito café
          </h2>
          <p class="text-white/90 dark:text-[var(--color-text)]/90">
            Se ele te ajudou de alguma forma, considere apoiar o desenvolvimento
            para que possam vir ainda mais melhorias. Cada café conta!
          </p>
        </div>
        <SharedPixSupport />
      </div>
    </AnimationsReveal>
  </UPageSection>
</template>

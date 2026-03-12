<template>
  <UPageSection
    class="bg-[var(--color-primary)] dark:bg-[var(--color-secondary)]/5 px-6 flex flex-col items-center justify-center gap-6 text-center border-y border-[var(--color-secondary)]/20 dark:border-[var(--color-secondary)]/10"
  >
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <div class="py-8 lg:py-12 text-center flex flex-col items-center gap-4">
        <h2
          class="text-3xl lg:text-4xl font-bold text-[var(--color-secondary)] dark:text-[var(--color-secondary)]"
        >
          Seu cartão de visita pronto em minutos
        </h2>
        <p class="text-white/60 dark:text-[var(--color-text)]/70 text-base">
          Sem cadastro, sem custo, sem complicação. Acesse o editor e baixe seu
          PDF agora mesmo.
        </p>
        <UButton
          to="/editor"
          size="xl"
          variant="outline"
          class="font-semibold border-2 border-[var(--color-secondary)] dark:border-[var(--color-secondary)] text-[var(--color-secondary)] dark:text-[var(--color-secondary)] px-8 hover:opacity-80 mt-4"
          :ui="{ base: 'hover:bg-transparent' }"
        >
          Criar meu cartão agora →
        </UButton>
      </div>
    </AnimationsReveal>
  </UPageSection>
</template>

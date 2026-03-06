<template>
  <UPageHero
    id="hero"
    title="VisitCard Generator"
    description="Crie seu cartão de visita de forma prática, moderna, rápida, 100% grátis e direto do seu navegador! Divulgue sua marca com qualidade"
    orientation="horizontal"
    :ui="{
      container: 'lg:pb-16',
      title: 'text-primary dark:text-secondary',
      description: 'text-primary/80 dark:text-white/80',
    }"
  >
    <template #links>
      <UButton
        to="/editor"
        size="xl"
        variant="outline"
        class="font-semibold border-2 border-[var(--color-primary)] dark:border-[var(--color-secondary)] text-[var(--color-primary)] dark:text-[var(--color-secondary)] px-8 hover:opacity-80"
        :ui="{ base: 'hover:bg-transparent' }"
      >
        Confira agora →
      </UButton>
    </template>

    <AnimationsReveal :duration="1" direction="left" type="scale">
      <nuxt-img
        src="/images/app_assets/step_1.png"
        alt="App screenshot"
        class="rounded-lg shadow-2xl ring ring-default"
      />
    </AnimationsReveal>
  </UPageHero>
</template>

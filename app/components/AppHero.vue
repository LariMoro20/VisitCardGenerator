<template>
  <UPageHero
    title="Visit Card Generator"
    description="Crie seu cartão de visita de forma prática, moderna, rápida, 100% grátis e direto do seu navegador! Divulgue sua marca com qualidade"
    orientation="horizontal"
    :ui="{
      container: 'lg:pb-16',
      title: 'text-primary dark:text-secondary',
      description: 'text-primary/80 dark:text-white/80',
    }"
  >
    <AnimationsReveal :duration="1" direction="left" type="scale">
      <nuxt-img
        src="/generatorPrint.png"
        alt="App screenshot"
        class="rounded-lg shadow-2xl ring ring-default"
      />
    </AnimationsReveal>
  </UPageHero>
</template>

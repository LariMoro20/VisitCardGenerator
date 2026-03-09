<template>
  <section
    class="min-h-screen px-6 flex flex-col items-center justify-center gap-6 text-center"
  >
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <h2
        class="text-3xl lg:text-5xl font-serif font-bold text-[var(--color-primary)] dark:text-[var(--color-secondary)] max-w-2xl"
      >
        Seu cartão de visita pronto em minutos
      </h2>
      <p
        class="text-[var(--color-primary)]/70 dark:text-white/70 max-w-md mx-auto text-base mt-2"
      >
        Sem cadastro, sem custo, sem complicação. Acesse o editor e baixe seu
        PDF agora mesmo.
      </p>
      <UButton
        to="/editor"
        size="xl"
        variant="outline"
        class="font-semibold border-2 border-[var(--color-primary)] dark:border-[var(--color-secondary)] text-[var(--color-primary)] dark:text-[var(--color-secondary)] px-8 hover:opacity-80 mt-4"
        :ui="{ base: 'hover:bg-transparent' }"
      >
        Criar meu cartão agora →
      </UButton>
    </AnimationsReveal>
  </section>
</template>

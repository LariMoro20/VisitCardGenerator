<template>
  <header
    class="px-6 md:px-6 py-4 md:py-4 border-b border-[var(--color-secondary)] flex items-center justify-between gap-4"
  >
    <NuxtLink
      to="/"
      class="flex items-center shrink-0 cursor-pointer"
      aria-label="Ir para página inicial"
    >
      <UColorModeImage
        light="/images/genlogo.png"
        dark="/images/genlogo_white.png"
        :height="32"
        format="webp"
      />
    </NuxtLink>
    <h1 class="text-lg md:text-2xl font-normal hidden sm:block">
      Gerador de Cartão de Visita
    </h1>
    <span
      class="text-[0.78rem] text-[var(--color-text)] tracking-[.12em] uppercase hidden md:block"
    >
      PDF frente e verso
    </span>
    <UColorModeButton class="ml-auto md:ml-4" />
  </header>
</template>

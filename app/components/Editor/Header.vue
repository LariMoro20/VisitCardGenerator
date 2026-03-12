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
        :height="42"
        format="webp"
      />
    </NuxtLink>
    <h1 class="text-lg md:text-2xl font-normal block">Editor</h1>

    <UColorModeButton class="md:ml-4" />
  </header>
</template>

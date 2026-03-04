<template>
  <UContainer class="pb-20">
    <UPageCTA
      title="Stack de tecnologia"
      description="Algumas tecnologias e ferramentas usadas"
      variant="naked"
      :ui="{
        container: 'pb-10!',
        title: 'text-primary dark:text-secondary',
        description: 'text-primary/80 dark:text-white/80',
      }"
    />
    <UPageLogos
      marquee
      :items="[
        'logos:vue',
        'devicon:nuxt',
        'logos:pinia',
        'logos:axios',
        'skill-icons:javascript',
        'skill-icons:typescript',
        'skill-icons:npm-light',
      ]"
    />
  </UContainer>
</template>

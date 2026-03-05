<template>
  <UContainer class="pb-20">
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <UPageCTA
        title="Stack de tecnologia"
        description="Algumas das tecnologias e ferramentas que trabalho"
        variant="naked"
        :ui="{
          container: 'pb-10!',
          title: 'text-primary dark:text-secondary',
          description: 'text-primary/80 dark:text-white/80',
        }"
    /></AnimationsReveal>
    <UPageLogos
      marquee
      :items="[
        'logos:vue',
        'devicon:nuxt',
        'logos:pinia',
        'devicon:quasar',
        'devicon:vuetify',
        'logos:tailwindcss-icon',
        'logos:daisyui',
        'logos:graphql',
        'logos:axios',
        'logos:php',
        'skill-icons:javascript',
        'skill-icons:typescript',
        'skill-icons:npm-light',
      ]"
    />
  </UContainer>
</template>

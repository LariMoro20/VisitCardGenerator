<template>
  <UContainer class="pb-20">
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <UPageCTA
        title="Tecnologias usadas no projeto"
        description="Ferramentas utilizadas na construção do VisitCardGenerator"
        variant="naked"
        :ui="{
          container: 'pb-10!',
          title: 'text-primary dark:text-secondary',
          description: 'text-primary/80 dark:text-white/80',
        }"
      />
    </AnimationsReveal>

    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <div class="flex flex-wrap gap-3">
        <UBadge
          v-for="tech in projectTechs"
          :key="tech.label"
          variant="outline"
          size="lg"
          class="gap-2 px-3 py-1.5 border-[var(--color-secondary)] text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
        >
          <Icon :name="tech.icon" size="16" />
          {{ tech.label }}
        </UBadge>
      </div>
    </AnimationsReveal>
  </UContainer>
</template>

<script setup lang="ts">
const projectTechs = [
  { label: "Nuxt 3", icon: "devicon:nuxt" },
  { label: "NuxtUI", icon: "logos:vue" },
  { label: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
  { label: "TypeScript", icon: "skill-icons:typescript" },
  { label: "jsPDF", icon: "skill-icons:javascript" },
  { label: "html-to-image", icon: "skill-icons:javascript" },
  { label: "Pinia", icon: "logos:pinia" },
  { label: "motion-v", icon: "logos:vue" },
  { label: "@nuxtjs/seo", icon: "devicon:nuxt" },
  { label: "@nuxt/image", icon: "devicon:nuxt" },
];
</script>

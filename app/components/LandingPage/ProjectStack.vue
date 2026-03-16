<template>
  <UPageSection id="stack">
    <UContainer>
      <AnimationsReveal :duration="2" direction="up" type="fade-slide">
        <h2
          class="text-2xl lg:text-3xl font-bold text-center text-[var(--color-primary)] dark:text-[var(--color-secondary)] mb-8"
        >
          Tecnologias usadas neste projeto
        </h2>
        <div class="flex flex-wrap justify-center gap-3">
          <UMarquee :overlay="false">
            <UBadge
              v-for="tech in projectTechs"
              :key="tech.label"
              variant="outline"
              size="lg"
              class="gap-2 px-3 py-1.5 border-[var(--color-secondary)] text-[var(--color-primary)] dark:text-[var(--color-text)]"
            >
              <Icon :name="tech.icon" size="16" />
              {{ tech.label }}
            </UBadge>
          </UMarquee>
        </div>
      </AnimationsReveal>
    </UContainer>
  </UPageSection>
</template>

<script setup lang="ts">
const projectTechs = [
  { label: "Nuxt 3", icon: "devicon:nuxt" },
  { label: "NuxtUI", icon: "devicon:nuxt" },
  { label: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
  { label: "Pinia", icon: "logos:pinia" },
  { label: "TypeScript", icon: "skill-icons:typescript" },
  { label: "jsPDF", icon: "skill-icons:javascript" },
  { label: "html-to-image", icon: "skill-icons:javascript" },
  { label: "motion-v", icon: "logos:vue" },
  { label: "@nuxtjs/seo", icon: "devicon:nuxt" },
  { label: "@nuxt/image", icon: "devicon:nuxt" },
];
</script>

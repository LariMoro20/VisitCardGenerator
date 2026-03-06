<template>
  <UPageSection
    id="author"
    :title="`Sobre ${name}`"
    :description="bio"
    orientation="horizontal"
    :links="links"
    :ui="{
      title: 'text-primary dark:text-secondary',
      description: 'text-[var(--color-text)]',
    }"
  >
    <AnimationsReveal
      v-for="(feature, i) in features"
      :key="feature.title"
      type="fade-slide"
      direction="up"
      :delay="i * 0.5"
    >
      <div class="flex items-center gap-4">
        <Icon
          :name="feature.icon"
          :style="{ color: 'var(--color-secondary)' }"
          size="24"
        />
        <div>
          <h3 class="font-semibold text-[var(--color-text)]">
            {{ feature.title }}
          </h3>
          <p class="text-[var(--color-text)]">{{ feature.description }}</p>
        </div>
      </div>
    </AnimationsReveal>
  </UPageSection>

  <UPageSection class="pb-20">
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <div class="py-4 lg:py-0 text-center flex flex-col items-center gap-4">
        <h2
          class="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
        >
          Stack de tecnologia
        </h2>
        <p
          class="text-[var(--color-primary)]/80 dark:text-white/80 max-w-xl text-base"
        >
          Algumas das tecnologias e ferramentas que trabalho
        </p>
      </div>
    </AnimationsReveal>
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
  </UPageSection>
</template>

<script setup lang="ts">
interface GithubUser {
  bio: string | null;
  avatar_url: string;
  login: string;
  name: string;
  html_url: string;
  [key: string]: any;
}

const config = useRuntimeConfig();
const { data } = await useFetch<GithubUser>(
  "https://api.github.com/users/LariMoro20",
  {
    headers: config.public.githubToken
      ? { Authorization: `Bearer ${config.public.githubToken}` }
      : {},
  },
);

const bio = computed(() => data.value?.bio || "");
const name = computed(() => data.value?.name || "");
const githubUrl = computed(() => data.value?.html_url);

const anosExperiencia = new Date().getFullYear() - 2016;

const features = [
  {
    title: `${anosExperiencia}+ anos de experiência`,
    description:
      "Fullstack desde 2016 com PHP e MySQL. A partir de 2021, foco exclusivo em Frontend com Vue.js, atuando como referência técnica em times de produto.",
    icon: "mdi:briefcase-outline",
  },
  {
    title: "Especialista em Vue.js & Ecossistema",
    description:
      "Vue.js e Quasar como stack principal. Pinia, Apollo Client, Axios, REST e GraphQL. Arquitetura de SPAs, design system, web components e testes com Cypress e Vitest.",
    icon: "mdi:vuejs",
  },
  {
    title: "Palestrante & Mentora",
    description:
      "Ministrante de Claude Code em Ação na Nuvini (2025) e palestrante de UX/UI e Frontend na DataHub Analytics (2023).",
    icon: "mdi:presentation",
  },
  {
    title: "Formação Técnica e Superior",
    description:
      "Técnica em Informática e Analista e Desenvolvedora de Sistemas pelo IFRS — Campus Osório.",
    icon: "mdi:school-outline",
  },
  {
    title: "Boas Práticas & Metodologias",
    description:
      "Desenvolvimento orientado a SOLID, componentização, code review e Scrum. Experiência com Gitflow e Azure DevOps em times multidisciplinares.",
    icon: "mdi:code-braces-box",
  },
  {
    title: "Adaptabilidade de Stack",
    description:
      "Além do ecossistema Vue.js, experiência profissional com diversas stacks como React, Node.js, CodeIgniter, Laravel e Ionic. Me adapto bem a diferentes contextos e tecnologias.",
    icon: "mdi:lightning-bolt-outline",
  },
  {
    title: "Aprendizado Contínuo",
    description:
      "Certificações recentes em NuxtJS, Vuetify, DaisyUI, Oracle Cloud e IA. Sempre explorando novas ferramentas. Projetos e cursos disponíveis no GitHub.",
    icon: "mdi:certificate-outline",
  },
];

const links = computed(() => [
  {
    label: "Linkedin",
    to: "https://www.linkedin.com/in/lari-moro-ss/",
    target: "_blank",
    color: "neutral" as const,
    variant: "subtle" as const,
    trailingIcon: "uil:linkedin",
  },
  {
    label: "Portfólio",
    to: "https://larissa-santos.vercel.app/",
    target: "_blank",
    color: "neutral" as const,
    variant: "subtle" as const,
    trailingIcon: "uil:browser",
  },
  {
    label: "Github",
    to: githubUrl.value,
    target: "_blank",
    color: "neutral" as const,
    variant: "subtle" as const,
    trailingIcon: "uil:github",
  },
]);
</script>

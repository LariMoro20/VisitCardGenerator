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
      </div></AnimationsReveal
    >
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
const features = ref([
  {
    title: "Especialista em Vue.js & Ecossistema",
    description:
      "Vue.js como stack principal com Quasar, Nuxt, Vuetify, NuxtUI e DaisyUI. Estilização com Tailwind CSS e integração de dados via Axios e GraphQL.",
    icon: "mdi:vuejs",
  },
  {
    title: "8 anos de experiência",
    description:
      "Desenvolvedora fullstack com PHP e Vue.js, com sólida experiência em projetos web do zero à produção.",
    icon: "mdi:briefcase-outline",
  },
  {
    title: "Formação",
    description:
      "Analista e Desenvolvedora de Sistemas pelo IFRS — Campus Osório.",
    icon: "mdi:school-outline",
  },
]);

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
      ? {
          Authorization: `Bearer ${config.public.githubToken}`,
        }
      : {},
  },
);

const bio = computed(() => data.value?.bio || "");
const name = computed(() => data.value?.name || "");
const githubUrl = computed(() => data.value?.html_url);

const links = ref([
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

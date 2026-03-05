<template>
  <UPageSection
    :title="`Sobre ${name}`"
    :description="bio"
    orientation="horizontal"
    :features="features"
    :links="links"
    :ui="{
      title: 'text-primary dark:text-secondary',
      description: 'text-primary/80 dark:text-white/80',
    }"
  >
    <NuxtImg
      v-if="avatar"
      :src="avatar"
      width="152"
      height="247"
      alt="Illustration"
      class="w-full max-w-sm md:max-w-sm lg:max-w-md rounded-lg"
      loading="lazy"
    />
  </UPageSection>
</template>

<script setup lang="ts">
const features = ref([
  {
    title: "Experiência",
    description:
      "Mais de 8 anos de experiência no desenvolvimento de soluções com tecnologias web",
    icon: "mdi:work-outline",
  },
  {
    title: "Formação",
    description:
      "Analista e Desenvolvedora de Sistemas, Graduada em Desenvolvimento de Sistemas pelo IFRS - Campus Osório",
    icon: "mdi:university-outline",
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

const { data, status, error, refresh, clear } = await useFetch<GithubUser>(
  "https://api.github.com/users/LariMoro20",
  {
    headers: config.public.githubToken
      ? {
          Authorization: `Bearer ${config.public.githubToken}`,
        }
      : {},
  },
);

const avatar = computed(() => data.value?.avatar_url || "");
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

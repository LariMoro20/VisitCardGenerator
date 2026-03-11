<template>
  <UPageSection id="author" :ui="{ title: 'text-primary dark:text-secondary' }">
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <div class="flex flex-col gap-4 max-w-xl">
        <h2
          class="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
        >
          Sobre {{ name }}
        </h2>
        <p class="text-[var(--color-text)]">{{ bio }}</p>
        <p class="text-[var(--color-text)]/80 text-sm">
          Desenvolvedora Fullstack com {{ anosExperiencia }}+ anos de
          experiência, especialista em Vue.js e ecossistema frontend.
        </p>
        <div class="flex gap-3 flex-wrap mt-2">
          <UButton v-for="link in links" :key="link.label" v-bind="link" />
        </div>
      </div>
    </AnimationsReveal>
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

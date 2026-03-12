<template>
  <section
    id="author"
    class="py-20 flex flex-col items-center justify-center gap-6 scroll-mt-20"
  >
    <UContainer class="mt-0">
      <AnimationsReveal :duration="2" direction="up" type="fade-slide">
        <div class="flex flex-col lg:flex-row md:flex-row gap-8 w-full">
          <NuxtImg
            v-if="avatar"
            :src="avatar"
            width="150"
            height="150"
            alt="Foto de Larissa Santos"
            class="rounded-lg self-center mb-4 lg:mb-0"
            loading="lazy"
          />
          <div class="flex flex-col gap-4 w-full">
            <h2
              class="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
            >
              Feito por {{ name }}
            </h2>
            <p class="text-[var(--color-text)]">{{ bio }}</p>
            <p class="text-[var(--color-text)]/80 text-sm">
              Desenvolvedora Fullstack com {{ anosExperiencia }}+ anos de
              experiência em desenvolvimento do zero à produção. Especializada
              em Vue.js e seu ecosistema. Gosto de transformar problemas simples
              em soluções bem feitas, e essa ferramenta é prova disso. É um
              projeto vivo, que melhora a cada dia, e cada sugestão de quem usa
              faz parte dessa evolução. Fique à vontade pra compartilhar a sua!
            </p>
            <div class="flex flex-col gap-2 mt-2">
              <p class="text-sm text-[var(--color-text)]/60">
                Quer saber mais sobre minha trajetória? Acesse os links abaixo.
              </p>
              <div class="flex gap-3 flex-wrap">
                <UButton
                  v-for="link in links"
                  :key="link.label"
                  v-bind="link"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimationsReveal>
    </UContainer>
  </section>
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
const avatar = computed(() => data.value?.avatar_url || "");
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

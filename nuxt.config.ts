// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "system", // padrão inicial (system | light | dark)
    fallback: "light",
  },
  ssr: true,
  runtimeConfig: {
    public: {
      githubToken: process.env.NUXT_PUBLIC_GITHUB_TOKEN,
    },
  },
  ui: {
    colorMode: true,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxtjs/seo",
  ],
  image: {
    domains: ["avatars.githubusercontent.com"],
    provider: "ipx",
    ipx: {
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  app: {
    head: {
      titleTemplate: "%s | VisitCardGeneator",
      htmlAttrs: {
        lang: "pt-BR",
      },
      meta: [
        {
          name: "keywords",
          keywords: "cartao de visita, visitcard, pdf, generator, marketing",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  site: {
    url: "https://visitcard.vercel.app",
    name: "VisitCard",
    description: "Crie seu cartão de visitas de forma personalizada!",
    defaultLocale: "pt-BR",
    keywords: "cartao de visita, visitcard, pdf, generator, marketing",
  },
  ogImage: {
    enabled: true,
  },
  nitro: {
    preset: "vercel",
    prerender: {
      crawlLinks: true,
      routes: ["/blog"],
    },
    routeRules: {
      "/_ipx/**": { headers: { "cache-control": "max-age=604800, public" } },
    },
  },
});

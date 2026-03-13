export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  colorMode: {
    preference: "dark",
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
    "@vercel/analytics",
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
      titleTemplate: "%s | VisitCardGenerator",
      htmlAttrs: { lang: "pt-BR" },
      meta: [
        { name: "theme-color", content: "#0b2a4a" },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Larissa Santos" },
        {
          name: "google-site-verification",
          content: "DB1TeepVPdAuIKldl5LXQHnY7hbD9Fm9aBOa5uPrUDI",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
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
    url: "https://visitcard-larisantos.vercel.app/",
    name: "VisitCardGenerator",
    description:
      "Gere cartões de visita profissionais com frente e verso em PDF. Personalize cores, logo, padrões e baixe na hora, sem cadastro.",
    defaultLocale: "pt-BR",
    keywords:
      "cartão de visita, gerador de cartão de visita, cartão de visita PDF, criar cartão de visita online, VisitCardGenerator",
  },

  ogImage: {
    enabled: true,
  },

  nitro: {
    preset: "vercel",
    prerender: {
      crawlLinks: true,
      routes: ["/", "/editor"],
    },
    routeRules: {
      "/editor": { prerender: false, ssr: true },
      "/_ipx/**": { headers: { "cache-control": "max-age=604800, public" } },
    },
  },
});

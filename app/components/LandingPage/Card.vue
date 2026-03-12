<template>
  <UPageSection id="example" class="py-16 scroll-mt-20">
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <h2
        class="text-2xl lg:text-3xl font-bold text-center text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
      >
        Resultado final, pronto para impressão
      </h2>
      <p
        class="text-base text-center text-[var(--color-primary)]/80 dark:text-white/80 mt-2 mb-6"
      >
        Cartão profissional com frente e verso personalizados, no tamanho exato
        para gráficas.
      </p>
      <div class="flex flex-col items-center gap-6">
        <div
          class="flex gap-1 rounded-lg p-1 border border-[var(--color-secondary)]"
        >
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="text-[.78rem] px-4.5 py-1.5 rounded-md cursor-pointer border-0 transition-colors tracking-[.04em] capitalize"
            :class="
              activeTab === tab.value
                ? 'bg-[var(--color-secondary)] text-[var(--color-background)] font-semibold'
                : 'bg-transparent text-[var(--color-text)]'
            "
            @click="switchTab(tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>

        <div
          class="w-full flex justify-center py-4 sm:py-10 px-6"
          style="min-height: 220px"
        >
          <div :style="flipWrapperStyle">
            <div
              ref="cardRef"
              class="rounded-2xl shadow-[0_28px_72px_rgba(0,0,0,0.65)] shrink-0 scale-[0.62] sm:scale-[0.8] md:scale-90 lg:scale-[1.3]"
              :style="cardStyle"
              @mousemove="onMouseMove"
              @mouseleave="onMouseLeave"
            >
              <EditorCardBusinessFront
                v-show="activeTab === 'front'"
                v-bind="cardFrontProps"
              />
              <EditorCardBusinessBack
                v-show="activeTab === 'back'"
                v-bind="cardBackProps"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimationsReveal>
  </UPageSection>
</template>

<script setup lang="ts">
const activeTab = ref<"front" | "back">("front");

const tabs = [
  { value: "front" as const, label: "Frente" },
  { value: "back" as const, label: "Verso" },
];

const cardFrontProps = {
  companyName: "Ana Beatriz Advocacia",
  description: "Direito Civil, Trabalhista e Previdenciário",
  phone: "(51) 99874-3210",
  email: "contato@anabeatrizadv.com.br",
  website: "www.anabeatrizadv.com.br",
  backgroundColor: "#1a1a2e",
  textColor: "#e8e4dc",
  accentColor: "#c9a96e",
  bgImage: null,
  bgOpacity: 0.55,
  logo: "images/app_assets/advog_example.png",
  pattern: "solid",
};

const cardBackProps = {
  companyName: "Ana Beatriz Advocacia",
  description: "Direito Civil, Trabalhista e Previdenciário",
  backgroundColor: "#111827",
  textColor: "#e8e4dc",
  accentColor: "#c9a96e",
  bgImage: null,
  bgOpacity: 0.55,
  logo: "images/app_assets/advog_example.png",
  pattern: "waves",
};

const rx = ref(0);
const ry = ref(0);
const flipY = ref(0);
const isFlipping = ref(false);

const flipWrapperStyle = computed(() => ({
  transition: "transform 0.35s ease",
  transform: `rotateY(${flipY.value}deg)`,
}));

const cardStyle = computed(() => ({
  transform: `perspective(800px) rotateX(${rx.value}deg) rotateY(${ry.value}deg)`,
  transition: "transform 0.15s ease",
}));

async function switchTab(tab: "front" | "back") {
  if (isFlipping.value || activeTab.value === tab) return;
  isFlipping.value = true;

  flipY.value = 90;
  await new Promise((r) => setTimeout(r, 350));

  activeTab.value = tab;
  flipY.value = -90;

  await nextTick();
  requestAnimationFrame(() => {
    flipY.value = 0;
  });
  setTimeout(() => {
    isFlipping.value = false;
  }, 350);
}

function onMouseMove(e: MouseEvent) {
  if (isFlipping.value) return;
  const el = e.currentTarget as HTMLElement;
  const { left, top, width, height } = el.getBoundingClientRect();
  const x = (e.clientX - left) / width - 0.5;
  const y = (e.clientY - top) / height - 0.5;
  ry.value = x * 20;
  rx.value = -y * 20;
}

function onMouseLeave() {
  rx.value = 0;
  ry.value = 0;
}
</script>

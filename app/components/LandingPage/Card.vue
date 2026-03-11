<template>
  <UContainer id="example" class="py-16 scroll-mt-20">
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
            v-for="tab in ['frente', 'verso'] as const"
            :key="tab"
            class="text-[.78rem] px-4.5 py-1.5 rounded-md cursor-pointer border-0 transition-colors tracking-[.04em] capitalize"
            :class="
              aba === tab
                ? 'bg-[var(--color-secondary)] text-[var(--color-background)] font-semibold'
                : 'bg-transparent text-[var(--color-text)]'
            "
            @click="trocarAba(tab)"
          >
            {{ tab }}
          </button>
        </div>

        <div class="w-full flex justify-center py-10 px-6">
          <div :style="flipWrapperStyle">
            <div
              ref="cardRef"
              class="rounded-2xl shadow-[0_28px_72px_rgba(0,0,0,0.65)] shrink-0 lg:scale-[1.3]"
              :style="cardStyle"
              @mousemove="onMouseMove"
              @mouseleave="onMouseLeave"
            >
              <EditorCardBusinessFront
                v-show="aba === 'frente'"
                v-bind="cardProps"
              />
              <EditorCardBusinessBack
                v-show="aba === 'verso'"
                v-bind="cardBackProps"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimationsReveal>
  </UContainer>
</template>

<script setup lang="ts">
const aba = ref<"frente" | "verso">("frente");

const cardProps = {
  empresa: "Ana Beatriz Advocacia",
  descricao: "Direito Civil, Trabalhista e Previdenciário",
  telefone: "(51) 99874-3210",
  email: "contato@anabeatrizadv.com.br",
  site: "www.anabeatrizadv.com.br",
  corFundo: "#1a1a2e",
  corTexto: "#e8e4dc",
  corDestaque: "#c9a96e",
  bgImage: null,
  bgOpacity: 0.55,
  logo: "images/app_assets/advog_example.png",
  padrao: "solid",
};

const cardBackProps = {
  empresa: "Ana Beatriz Advocacia",
  descricao: "Direito Civil, Trabalhista e Previdenciário",
  corFundo: "#111827",
  corTexto: "#e8e4dc",
  corDestaque: "#c9a96e",
  bgImage: null,
  bgOpacity: 0.55,
  logo: "images/app_assets/advog_example.png",
  padrao: "waves",
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

async function trocarAba(tab: "frente" | "verso") {
  if (isFlipping.value || aba.value === tab) return;
  isFlipping.value = true;

  flipY.value = 90;
  await new Promise((r) => setTimeout(r, 350));

  aba.value = tab;
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

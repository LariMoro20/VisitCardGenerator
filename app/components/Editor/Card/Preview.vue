<template>
  <main
    class="h-full flex flex-col items-center justify-center gap-6 p-4 md:p-10"
  >
    <div
      class="flex gap-1 rounded-lg p-1 border border-[var(--color-secondary)]"
    >
      <UButton
        v-for="tab in ['frente', 'verso'] as const"
        :key="tab"
        size="xs"
        variant="ghost"
        class="capitalize tracking-[.04em] transition-colors"
        :class="
          aba === tab
            ? 'bg-[var(--color-primary)] dark:bg-[var(--color-secondary)] text-white dark:text-[var(--color-primary)] font-semibold'
            : 'text-[var(--color-text)]'
        "
        @click="aba = tab"
      >
        {{ tab }}
      </UButton>
    </div>

    <div class="flex items-center justify-center" :style="wrapperStyle">
      <div class="origin-center transition-transform" :style="scaleStyle">
        <div
          class="rounded-2xl overflow-hidden shadow-[0_28px_72px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)] dark:shadow-[0_28px_72px_rgba(255,255,255,0.12),0_0_0_1px_rgba(255,255,255,0.08)]"
        >
          <EditorCardBusinessFront
            v-show="aba === 'frente'"
            ref="cardFrenteRef"
            v-bind="cardFrenteProps"
          />
          <EditorCardBusinessBack
            v-show="aba === 'verso'"
            ref="cardVersoRef"
            v-bind="cardVersoProps"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
defineProps<{
  cardFrenteProps: Record<string, unknown>;
  cardVersoProps: Record<string, unknown>;
}>();

const CARD_W = 520;
const CARD_H = 296;
const containerW = ref(0);
const aba = ref<"frente" | "verso">("frente");
const cardFrenteRef = ref<{ $el: HTMLElement } | null>(null);
const cardVersoRef = ref<{ $el: HTMLElement } | null>(null);
defineExpose({ cardFrenteRef, cardVersoRef });

const scale = computed(() => {
  const available =
    containerW.value < 768
      ? containerW.value - 32
      : containerW.value - 390 - 80;
  return Math.min(1, available / CARD_W);
});

const scaleStyle = computed(() => ({
  transform: `scale(${scale.value})`,
}));

const wrapperStyle = computed(() => ({
  width: `${CARD_W * scale.value}px`,
  height: `${CARD_H * scale.value}px`,
}));

const updateWidth = () => {
  containerW.value = window.innerWidth;
};

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});
onUnmounted(() => window.removeEventListener("resize", updateWidth));
</script>

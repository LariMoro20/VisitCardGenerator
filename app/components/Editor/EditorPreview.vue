<template>
  <main
    class="h-full flex flex-col items-center justify-center gap-6 p-4 md:p-10"
  >
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
        @click="aba = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- wrapper que escala o cartão para caber na tela -->
    <div class="w-full flex items-center justify-center overflow-hidden">
      <div class="origin-center transition-transform" :style="scaleStyle">
        <div
          class="rounded-2xl overflow-hidden shadow-[0_28px_72px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)]"
        >
          <EditorBusinessCard
            v-show="aba === 'frente'"
            ref="cardFrenteRef"
            v-bind="cardFrenteProps"
          />
          <EditorBusinessCardBack
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
import { ref, computed, onMounted, onUnmounted } from "vue";

defineProps<{
  cardFrenteProps: Record<string, unknown>;
  cardVersoProps: Record<string, unknown>;
}>();

const aba = ref<"frente" | "verso">("frente");
const cardFrenteRef = ref<{ $el: HTMLElement } | null>(null);
const cardVersoRef = ref<{ $el: HTMLElement } | null>(null);
defineExpose({ cardFrenteRef, cardVersoRef });

const CARD_W = 520;
const containerW = ref(0);

const updateWidth = () => {
  containerW.value = window.innerWidth;
};

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => window.removeEventListener("resize", updateWidth));

const scaleStyle = computed(() => {
  const available =
    containerW.value < 768
      ? containerW.value - 32
      : containerW.value - 390 - 80;

  const scale = Math.min(1, available / CARD_W);
  return { transform: `scale(${scale})` };
});
</script>

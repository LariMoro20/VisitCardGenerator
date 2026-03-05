<template>
  <main class="h-full flex flex-col items-center justify-center gap-6 p-10">
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
  </main>
</template>

<script setup lang="ts">
defineProps<{
  cardFrenteProps: Record<string, unknown>;
  cardVersoProps: Record<string, unknown>;
}>();

const aba = ref<"frente" | "verso">("frente");

const cardFrenteRef = ref<{ $el: HTMLElement } | null>(null);
const cardVersoRef = ref<{ $el: HTMLElement } | null>(null);
defineExpose({ cardFrenteRef, cardVersoRef });

const { value: colorMode } = useColorMode();
</script>

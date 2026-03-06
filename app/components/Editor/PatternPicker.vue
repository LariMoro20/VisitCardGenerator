<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-4 gap-2">
      <div
        v-for="pattern in PATTERNS"
        :key="pattern.id"
        class="rounded-md border-2 cursor-pointer overflow-hidden transition-colors"
        :class="
          modelValue === pattern.id
            ? 'border-[var(--color-secondary)]'
            : 'border-[var(--color-primary)]'
        "
        style="aspect-ratio: 1.75; background: #f0f0f0"
        :title="pattern.label"
        @click="emit('update:modelValue', pattern.id)"
      >
        <svg
          viewBox="0 0 88 50"
          preserveAspectRatio="xMidYMid slice"
          class="w-full h-full block"
          v-html="pattern.preview('#a3a9a0')"
        />
      </div>
    </div>

    <div class="flex items-center gap-2.5">
      <UCheckbox
        v-model="padraoNaFrente"
        label=" Usar padrão também na frente "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PATTERNS } from "../../utils/patterns";

const props = defineProps<{
  modelValue: string;
  padraoNaFrente: boolean;
  accentColor: string;
  bgColor: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [v: string];
  "update:padraoNaFrente": [v: boolean];
}>();

const padraoNaFrente = computed({
  get: () => props.padraoNaFrente,
  set: (v) => emit("update:padraoNaFrente", v),
});
</script>

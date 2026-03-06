<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm text-[var(--color-text)] opacity-60">
      {{ label }}
    </label>
    <div
      class="flex items-center gap-2 border border-[var(--color-secondary)] rounded-lg px-2.5 py-1.5 focus-within:border-[var(--color-secondary)] transition-colors"
    >
      <input type="color" v-model="model" class="color-swatch" />
      <input
        type="text"
        v-model="model"
        maxlength="7"
        class="text-sm text-[var(--color-text)] bg-transparent border-0 outline-none p-0 w-0 flex-1 min-w-0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label?: string }>();
const model = defineModel<string>();
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm text-[var(--color-text)] opacity-60">
      {{ label }}
    </label>
    <div
      class="flex items-center gap-2 border border-[var(--color-secondary)] rounded-lg px-2.5 py-1.5 focus-within:border-[var(--color-secondary)] transition-colors"
    >
      <input
        type="color"
        :value="modelValue"
        class="color-swatch"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
      <input
        type="text"
        :value="modelValue"
        maxlength="7"
        class="text-sm text-[var(--color-text)] bg-transparent border-0 outline-none p-0 w-0 flex-1 min-w-0"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string; label?: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<style scoped>
.color-swatch {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  min-width: 28px;
  flex-shrink: 0;
  border: none;
  padding: 0;
  cursor: pointer;
  background: none;
  border-radius: 6px;
}
.color-swatch::-webkit-color-swatch-wrapper {
  padding: 0;
}
.color-swatch::-webkit-color-swatch {
  border: none;
  border-radius: 6px;
}
.color-swatch::-moz-color-swatch {
  border: none;
  border-radius: 6px;
}
</style>

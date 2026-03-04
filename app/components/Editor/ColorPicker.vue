<template>
  <div
    class="flex items-center gap-2 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-2.5 py-1.5 focus-within:border-[#c9a96e] transition-colors"
  >
    <input
      type="color"
      :value="modelValue"
      class="w-6.5 h-6.5 rounded-[5px] color-input"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <input
      type="text"
      :value="modelValue"
      maxlength="7"
      class="text-sm text-[#e8e4dc] flex-1 bg-transparent border-0 outline-none p-0"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<style scoped>
.color-input {
  border: none;
  padding: 0;
  cursor: pointer;
  background: none;
}
.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}
.color-input::-webkit-color-swatch {
  border: none;
  border-radius: 5px;
}
</style>

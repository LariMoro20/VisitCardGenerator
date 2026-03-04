<template>
  <div class="flex flex-col gap-1.5">
    <label class="text-sm text-[#a09a94] font-medium">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>();
</script>

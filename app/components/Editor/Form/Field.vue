<template>
  <div class="flex flex-col gap-1.5">
    <label class="text-sm font-medium" style="color: var(--color-text)">
      {{ label }}
    </label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <div
    class="relative border-2 border-dashed border-[var(--color-secondary)] rounded-lg text-center cursor-pointer hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/20 transition-colors flex flex-col items-center justify-center gap-1.5"
    :class="compact ? 'p-3 min-h-18' : 'p-4'"
    @click="emit('click')"
  >
    <slot />
    <button
      v-if="preview"
      class="absolute top-1 right-1 bg-[var(--color-negative)] hover:bg-[var(--color-negative)]/90 text-white rounded w-4.5 h-4.5 text-[.6rem] flex items-center justify-center z-10"
      @click.stop="emit('clear')"
    >
      ✕
    </button>
    <template v-if="preview">
      <img
        :src="preview"
        class="rounded object-cover"
        :class="compact ? 'w-full h-12 mb-0.5' : 'w-11 h-11 object-contain'"
      />
      <span class="text-[.75rem] text-[var(--color-secondary)] font-medium">
        Trocar
      </span>
    </template>
    <template v-else>
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="#6b6662"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <p
        v-if="!compact"
        class="text-[.75rem] text-[var(--color-text)] leading-snug"
      >
        <span class="text-[var(--color-secondary)] font-medium block">
          Clique para enviar
        </span>
        PNG, SVG ou JPG
      </p>
      <span
        v-else
        class="text-[.72rem] text-[var(--color-secondary)] font-medium"
      >
        Adicionar
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{ preview?: string | null; compact?: boolean }>();
const emit = defineEmits<{ click: []; clear: [] }>();
</script>

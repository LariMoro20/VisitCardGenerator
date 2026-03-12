<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-in-out"
      leave-active-class="transition-opacity duration-200 ease-in-out"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-200 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        @click.self="close"
      >
        <button
          class="absolute top-4 right-4 z-10 text-white/70 hover:text-white text-4xl leading-none cursor-pointer"
          @click="close"
        >
          ×
        </button>

        <span
          class="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm"
        >
          {{ modelValue! + 1 }} / {{ images.length }}
        </span>

        <button
          class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl flex items-center justify-center transition-colors cursor-pointer"
          @click="prev"
        >
          ‹
        </button>

        <button
          class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl flex items-center justify-center transition-colors cursor-pointer"
          @click="next"
        >
          ›
        </button>
        <img
          :src="selectedImage"
          class="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
        />
        <p
          v-if="captions?.[modelValue!]"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center"
        >
          {{ captions[modelValue!] }}
        </p>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps<{
  images: string[];
  modelValue: number | null;
  captions?: string[];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number | null];
}>();

const selectedImage = computed(() =>
  props.modelValue !== null ? (props.images[props.modelValue!] ?? null) : null,
);

function close() {
  emit("update:modelValue", null);
}

function prev() {
  if (props.modelValue === null) return;
  emit(
    "update:modelValue",
    (props.modelValue - 1 + props.images.length) % props.images.length,
  );
}

function next() {
  if (props.modelValue === null) return;
  emit("update:modelValue", (props.modelValue + 1) % props.images.length);
}
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>

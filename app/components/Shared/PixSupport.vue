<template>
  <div
    class="flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/20 dark:border-[var(--color-secondary)]/20 bg-white/10 dark:bg-[var(--color-secondary)]/5 w-full lg:w-96 shrink-0"
  >
    <p
      class="text-sm font-semibold text-white/80 dark:text-[var(--color-text)]/70 tracking-wide"
    >
      ☕ Um café = mais algumas horas de código!
    </p>
    <div
      class="flex gap-1 rounded-lg p-1 border border-[var(--color-secondary)]"
    >
      <UButton
        v-for="(option, i) in pixOptions"
        :key="i"
        size="sm"
        class="cursor-pointer text-white"
        :variant="selectedPix === option.value ? 'solid' : 'ghost'"
        :color="selectedPix === option.value ? 'secondary' : 'neutral'"
        @click="selectedPix = option.value"
      >
        {{ option.label }}
      </UButton>
    </div>
    <Transition name="qr-fade" mode="out-in">
      <img
        :key="selectedPix"
        :src="currentQr.src"
        :alt="`QR Code Pix ${currentQr.label}`"
        class="w-62 h-62 rounded-xl object-contain cursor-zoom-in"
        @click="selectedIndex = pixIndexMap[selectedPix]"
      />
    </Transition>
    <p
      class="text-xs text-center text-white/40 dark:text-[var(--color-text)]/50"
    >
      Escaneie com o app do seu banco
    </p>
  </div>
  <LandingPageLightbox
    v-model="selectedIndex"
    :images="images"
    :captions="pixOptions.map((o) => `Pix ${o.label}`)"
  />
</template>

<script setup lang="ts">
const pixOptions = [
  { value: "5", label: "R$ 5" },
  { value: "10", label: "R$ 10" },
  { value: "livre", label: "Livre" },
] as const;

const qrMap = {
  "5": { src: "/images/pix/qrpix-5.jpeg", label: "R$ 5" },
  "10": { src: "/images/pix/qrpix-10.jpeg", label: "R$ 10" },
  livre: { src: "/images/pix/qrpix-livre.jpeg", label: "valor livre" },
};

const pixIndexMap = { "5": 0, "10": 1, livre: 2 } as const;
const selectedPix = ref<"5" | "10" | "livre">("5");
const selectedIndex = ref<number | null>(null);
const currentQr = computed(() => qrMap[selectedPix.value]);
const images = computed(() =>
  pixOptions.map((o) => qrMap[o.value as keyof typeof qrMap].src),
);
</script>

<style scoped>
.qr-fade-enter-active,
.qr-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.qr-fade-enter-from,
.qr-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

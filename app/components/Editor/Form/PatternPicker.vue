<template>
  <div class="flex flex-col gap-4">

    <!-- Padrão do Verso -->
    <div class="flex flex-col gap-2">
      <span class="text-[.72rem] font-semibold tracking-[.1em] uppercase opacity-60">
        Verso
      </span>
      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="pattern in PATTERNS"
          :key="pattern.id"
          class="rounded-md border-2 cursor-pointer overflow-hidden transition-colors"
          :class="
            model === pattern.id
              ? 'border-[var(--color-secondary)]'
              : 'border-[var(--color-primary)]'
          "
          style="aspect-ratio: 1.75; background: #f0f0f0"
          :title="pattern.label"
          @click="model = pattern.id"
        >
          <svg
            viewBox="0 0 88 50"
            preserveAspectRatio="xMidYMid slice"
            class="w-full h-full block"
            v-html="pattern.preview('#a3a9a0')"
          />
        </div>
      </div>
    </div>

    <!-- Checkbox -->
    <div class="flex items-center gap-2.5">
      <UCheckbox
        v-model="patternOnFront"
        label=" Usar padrão também na frente"
      />
    </div>

    <!-- Padrão da Frente (só aparece quando checkbox ativo) -->
    <Transition name="fade">
      <div v-if="patternOnFront" class="flex flex-col gap-2">
        <span class="text-[.72rem] font-semibold tracking-[.1em] uppercase opacity-60">
          Frente
        </span>
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="pattern in PATTERNS"
            :key="pattern.id"
            class="rounded-md border-2 cursor-pointer overflow-hidden transition-colors"
            :class="
              patternFront === pattern.id
                ? 'border-[var(--color-secondary)]'
                : 'border-[var(--color-primary)]'
            "
            style="aspect-ratio: 1.75; background: #f0f0f0"
            :title="pattern.label"
            @click="patternFront = pattern.id"
          >
            <svg
              viewBox="0 0 88 50"
              preserveAspectRatio="xMidYMid slice"
              class="w-full h-full block"
              v-html="pattern.preview('#a3a9a0')"
            />
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { PATTERNS } from "../../../utils/patterns";

defineProps<{ accentColor: string; bgColor: string }>();

const model = defineModel<string>({ required: true });
const patternOnFront = defineModel<boolean>("patternOnFront", { required: true });
const patternFront = defineModel<string>("patternFront", { required: true });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
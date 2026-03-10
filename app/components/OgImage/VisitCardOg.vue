<template>
  <div
    class="w-[1200px] h-[630px] p-[64px] flex flex-col justify-between"
    :style="{
      background: `
        radial-gradient(800px 500px at 85% 20%, rgba(201,169,110,.25), transparent 70%),
        radial-gradient(600px 600px at 80% 80%, rgba(201,169,110,.12), transparent 70%),
        linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 60%, #111827 100%)
      `,
      color: '#e8e4dc',
    }"
  >
    <div class="flex flex-row items-center justify-between">
      <img
        src="/images/genlogo_white.png"
        width="220"
        height="52"
        style="height: 52px; width: auto; object-fit: contain"
      />
      <div
        class="px-4 py-2 rounded-full text-[14px] font-[700]"
        :style="{
          border: '1px solid rgba(201,169,110,.4)',
          background: 'rgba(201,169,110,.1)',
          color: '#c9a96e',
        }"
      >
        PDF · Frente e verso
      </div>
    </div>

    <div class="max-w-[820px]">
      <div class="text-[78px] leading-[1.02] font-[950] tracking-[-2px]">
        {{ title }}
      </div>
      <div class="mt-5 text-[30px] leading-[1.4]" :style="{ opacity: '.75' }">
        {{ description }}
      </div>
      <div class="mt-10 flex flex-row items-center gap-3">
        <div
          class="w-[120px] h-[8px] rounded-full"
          :style="{ background: '#c9a96e' }"
        ></div>
        <div
          class="w-[60px] h-[8px] rounded-full"
          :style="{ background: 'rgba(201,169,110,.4)' }"
        ></div>
        <div
          class="w-[24px] h-[8px] rounded-full"
          :style="{ background: 'rgba(201,169,110,.2)' }"
        ></div>
      </div>
    </div>

    <div class="flex flex-row justify-end">
      <div
        class="rounded-[24px] px-7 py-5"
        :style="{
          border: '1px solid rgba(201,169,110,.25)',
          background: 'rgba(201,169,110,.08)',
        }"
      >
        <div class="text-[20px] font-[900]" :style="{ color: '#c9a96e' }">
          Sem cadastro. Sem servidor.
        </div>
        <div class="text-[15px] mt-1" :style="{ opacity: '.7' }">
          Crie e baixe em segundos.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <aside
    class="bg-[#181818] border-r border-[#2a2a2a] px-[22px] py-6 overflow-y-auto flex flex-col gap-4"
  >
    <EditorSectionLabel>Identidade</EditorSectionLabel>

    <EditorFormField label="Logotipo">
      <EditorFileUploadBox
        :preview="logoPreview"
        @click="logoInput?.click()"
        @clear="emit('update:logoPreview', null)"
      >
        <input
          ref="logoInput"
          type="file"
          accept="image/*"
          class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          @change="(e) => onFile(e, (v) => emit('update:logoPreview', v))"
          @click.stop
        />
      </EditorFileUploadBox>
    </EditorFormField>

    <EditorFormField label="Nome da empresa">
      <UInput
        v-model="form.empresa"
        placeholder="Ex: Studio Forma"
        :maxlength="50"
        :ui="inputUi"
        class="w-full"
      />
    </EditorFormField>

    <EditorFormField label="Descrição / tagline">
      <UTextarea
        v-model="form.descricao"
        placeholder="Descreva sua empresa em algumas palavras…"
        :maxlength="200"
        :rows="3"
        :ui="inputUi"
        class="w-full"
      />
    </EditorFormField>

    <USeparator />
    <EditorSectionLabel>Contato</EditorSectionLabel>

    <EditorFormField label="Telefone">
      <UInput
        v-model="form.telefone"
        placeholder="+55 (11) 9 0000-0000"
        type="tel"
        :ui="inputUi"
        class="w-full"
      />
    </EditorFormField>
    <EditorFormField label="E-mail">
      <UInput
        v-model="form.email"
        placeholder="contato@empresa.com.br"
        type="email"
        :ui="inputUi"
        class="w-full"
      />
    </EditorFormField>
    <EditorFormField label="Site">
      <UInput
        v-model="form.site"
        placeholder="www.empresa.com.br"
        type="url"
        :ui="inputUi"
        class="w-full"
      />
    </EditorFormField>

    <USeparator />
    <EditorSectionLabel>Cores</EditorSectionLabel>

    <div class="grid grid-cols-2 gap-2.5">
      <EditorFormField
        v-for="(label, key) in colorFields"
        :key="key"
        :label="label"
      >
        <EditorColorPicker v-model="form[key as ColorKey]" />
      </EditorFormField>
    </div>

    <USeparator />
    <EditorSectionLabel>Imagem de fundo</EditorSectionLabel>

    <div class="grid grid-cols-2 gap-2.5">
      <EditorFormField v-for="u in bgUploads" :key="u.key" :label="u.label">
        <EditorFileUploadBox
          :preview="bgImages[u.key]"
          compact
          @click="u.ref.value?.click()"
          @clear="emit('update:bgImages', { ...bgImages, [u.key]: null })"
        >
          <input
            :ref="u.ref"
            type="file"
            accept="image/*"
            class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            @change="
              (e) =>
                onFile(e, (v) =>
                  emit('update:bgImages', { ...bgImages, [u.key]: v }),
                )
            "
            @click.stop
          />
        </EditorFileUploadBox>
      </EditorFormField>
    </div>

    <div class="flex items-center gap-2.5">
      <label class="text-sm text-[#a09a94] font-medium whitespace-nowrap"
        >Opacidade overlay</label
      >
      <input
        v-model.number="form.bgOpacity"
        type="range"
        min="0"
        max="1"
        step="0.05"
        class="flex-1 accent-[#c9a96e] cursor-pointer"
      />
      <span class="text-[.78rem] text-[#6b6662] min-w-[32px] text-right"
        >{{ Math.round(form.bgOpacity * 100) }}%</span
      >
    </div>

    <USeparator />
    <EditorSectionLabel>Padrão geométrico</EditorSectionLabel>

    <div class="grid grid-cols-4 gap-2">
      <div
        v-for="p in PATTERNS"
        :key="p.id"
        class="rounded-md border-2 cursor-pointer overflow-hidden transition-colors"
        :class="form.padrao === p.id ? 'border-[#c9a96e]' : 'border-[#2a2a2a]'"
        style="aspect-ratio: 1.75"
        :style="{ background: form.corVerso }"
        :title="p.label"
        @click="form.padrao = p.id"
      >
        <svg
          viewBox="0 0 88 50"
          preserveAspectRatio="xMidYMid slice"
          class="w-full h-full block"
          v-html="p.preview(form.corDestaque)"
        />
      </div>
    </div>

    <div class="flex items-center gap-2.5">
      <label class="text-[.82rem] text-[#a09a94] font-medium flex-1"
        >Usar padrão também na frente</label
      >
      <UToggle v-model="form.padraoNaFrente" color="yellow" />
    </div>

    <UButton
      block
      size="lg"
      :loading="gerando"
      :disabled="!formValido || gerando"
      class="mt-1 bg-[#c9a96e] hover:bg-[#c9a96e]/90 text-[#0f0f0f] font-semibold"
      @click="emit('gerar')"
    >
      {{ gerando ? "Gerando PDF…" : "↓ Baixar PDF (frente + verso)" }}
    </UButton>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PATTERNS } from "./patterns";

type ColorKey = "corFundo" | "corTexto" | "corDestaque" | "corVerso";

const form = defineModel<{
  empresa: string;
  descricao: string;
  telefone: string;
  email: string;
  site: string;
  corFundo: string;
  corTexto: string;
  corDestaque: string;
  corVerso: string;
  padrao: string;
  padraoNaFrente: boolean;
  bgOpacity: number;
}>("form", { required: true });

const props = defineProps<{
  logoPreview: string | null;
  bgImages: Record<string, string | null>;
  gerando: boolean;
  formValido: boolean;
}>();

const emit = defineEmits<{
  "update:logoPreview": [v: string | null];
  "update:bgImages": [v: Record<string, string | null>];
  gerar: [];
}>();

const inputUi = {
  base: "bg-[#0f0f0f] border border-[#2a2a2a] text-[#e8e4dc] focus:border-[#c9a96e] transition-colors",
  placeholder: "text-[#6b6662]",
};

const colorFields: Record<ColorKey, string> = {
  corFundo: "Fundo frente",
  corTexto: "Texto",
  corDestaque: "Destaque",
  corVerso: "Fundo verso",
};

const logoInput = ref<HTMLInputElement | null>(null);
const bgFrenteInput = ref<HTMLInputElement | null>(null);
const bgVersoInput = ref<HTMLInputElement | null>(null);

const bgUploads = [
  { key: "frente", label: "Frente", ref: bgFrenteInput },
  { key: "verso", label: "Verso", ref: bgVersoInput },
];

function onFile(e: Event, cb: (v: string) => void) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => cb(ev.target?.result as string);
  reader.readAsDataURL(file);
}
</script>

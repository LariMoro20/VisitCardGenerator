<template>
  <aside
    class="border-r border-[var(--color-secondary)] px-[22px] py-6 overflow-y-auto flex flex-col gap-4"
  >
    <EditorFormLabel>Identidade</EditorFormLabel>
    <EditorFormField label="Logotipo">
      <UFileUpload
        :dropzone="false"
        accept="image/*"
        :ui="uploadUi"
        @update:model-value="(file) => toBase64(file, (v) => (logoPreview = v))"
      />
    </EditorFormField>

    <EditorFormField label="Nome da empresa">
      <UInput
        v-model="form.empresa"
        placeholder="Ex: Studio Forma"
        :maxlength="50"
        :ui="inputUi"
      />
    </EditorFormField>

    <EditorFormField label="Descrição / tagline">
      <UTextarea
        v-model="form.descricao"
        placeholder="Descreva sua empresa em algumas palavras…"
        :maxlength="200"
        :rows="3"
        :ui="inputUi"
      />
    </EditorFormField>

    <USeparator />

    <EditorFormLabel>Contato</EditorFormLabel>
    <EditorFormField
      v-for="field in contactFields"
      :key="field.key"
      :label="field.label"
    >
      <UInput
        v-model="form[field.key as ContactKey]"
        :placeholder="field.placeholder"
        :type="field.type"
        :ui="inputUi"
      />
    </EditorFormField>

    <USeparator />

    <EditorFormLabel>Cores</EditorFormLabel>
    <div class="grid grid-cols-2 gap-2.5">
      <EditorFormColorPicker
        v-for="(label, key) in colorFields"
        :key="key"
        v-model="form[key as ColorKey]"
        :label="label"
      />
    </div>

    <USeparator />

    <EditorFormLabel>Imagem de fundo</EditorFormLabel>
    <div class="grid grid-cols-2 gap-2.5">
      <EditorFormField
        v-for="upload in bgUploads"
        :key="upload.key"
        :label="upload.label"
      >
        <UFileUpload
          :dropzone="false"
          accept="image/*"
          :ui="uploadUi"
          @update:model-value="
            (file) =>
              toBase64(
                file,
                (v) => (bgImages = { ...bgImages, [upload.key]: v }),
              )
          "
        />
      </EditorFormField>
    </div>

    <EditorFormLabel>Opacidade overlay</EditorFormLabel>
    <div class="flex items-center gap-2.5">
      <div class="flex-1 min-w-0">
        <USlider
          v-model="form.bgOpacity"
          :min="0"
          :max="1"
          :step="0.05"
          :ui="{ root: 'w-full' }"
        />
      </div>
      <span class="text-[.78rem] text-[var(--color-text)] min-w-8 text-right">
        {{ Math.round(form.bgOpacity * 100) }}%
      </span>
    </div>

    <USeparator />

    <EditorFormLabel>Padrão geométrico</EditorFormLabel>
    <EditorFormPatternPicker
      v-model="form.padrao"
      v-model:padraoNaFrente="form.padraoNaFrente"
      :accent-color="form.corDestaque"
      :bg-color="form.corVerso"
    />

    <UButton
      block
      size="lg"
      :loading="gerando"
      :disabled="!formValido || gerando"
      :color="isDark ? 'secondary' : 'primary'"
      class="text-white hover:opacity-90"
      @click="emit('gerar')"
    >
      {{ gerando ? "Gerando PDF…" : "↓ Baixar PDF (frente + verso)" }}
    </UButton>
  </aside>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

defineProps<{
  gerando: boolean;
  formValido: boolean;
}>();

const emit = defineEmits<{ gerar: [] }>();

type ColorKey = "corFundo" | "corTexto" | "corDestaque" | "corVerso";
type ContactKey = "telefone" | "email" | "site";
type Form = {
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
};

const form = defineModel<Form>("form", { required: true });
const logoPreview = defineModel<string | null>("logoPreview");
const bgImages = defineModel<Record<string, string | null>>("bgImages", {
  required: true,
});

const inputUi = {
  root: "w-full",
  base: "w-full border border-[var(--color-secondary)] text-[var(--color-text)] focus:border-[var(--color-primary)] transition-colors bg-transparent",
  placeholder: "text-[var(--color-placeholder)]",
};

const contactFields = [
  {
    key: "telefone",
    label: "Telefone",
    placeholder: "+55 (11) 9 0000-0000",
    type: "tel",
  },
  {
    key: "email",
    label: "E-mail",
    placeholder: "contato@empresa.com.br",
    type: "email",
  },
  {
    key: "site",
    label: "Site",
    placeholder: "www.empresa.com.br",
    type: "url",
  },
] as const;

const uploadUi = {
  base: "border-2 border-dashed border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/20 transition-colors w-full",
};

const colorFields: Record<ColorKey, string> = {
  corFundo: "Fundo frente",
  corTexto: "Texto",
  corDestaque: "Destaque",
  corVerso: "Fundo verso",
};

const bgUploads = [
  { key: "frente", label: "Frente" },
  { key: "verso", label: "Verso" },
];

function toBase64(
  file: File | null | undefined,
  cb: (v: string | null) => void,
) {
  if (!file) return cb(null);
  const reader = new FileReader();
  reader.onload = (ev) => cb(ev.target?.result as string);
  reader.readAsDataURL(file);
}
</script>

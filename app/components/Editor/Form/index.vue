<template>
  <aside
    class="border-r border-[var(--color-secondary)] flex h-full min-h-full"
  >
    <nav
      class="w-14 shrink-0 border-r border-[var(--color-secondary)] flex flex-col items-center py-4 gap-1"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer border-0"
        :class="
          activeTab === tab.key
            ? 'bg-[var(--color-primary)] dark:bg-[var(--color-secondary)] text-white dark:text-[var(--color-primary)]'
            : 'text-[var(--color-text)] hover:bg-[var(--color-secondary)]/20'
        "
        :title="tab.label"
        @click="activeTab = tab.key"
      >
        <UIcon :name="tab.icon" class="w-4 h-4 shrink-0" />
        <span class="text-[.5rem] leading-none tracking-wide uppercase">{{
          tab.shortLabel
        }}</span>
      </button>
    </nav>

    <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
      <div class="px-4 py-3 border-b border-[var(--color-secondary)]">
        <span
          class="text-[.72rem] font-semibold tracking-[.1em] uppercase text-[var(--color-text)] opacity-60"
        >
          {{ currentTab?.label }}
        </span>
      </div>

      <div class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        <template v-if="activeTab === 'identity'">
          <EditorFormField label="Logotipo">
            <UFileUpload
              :dropzone="false"
              accept="image/*"
              :ui="uploadUi"
              @update:model-value="
                (file) => toBase64(file, (v) => (logoPreview = v))
              "
            />
          </EditorFormField>
          <EditorFormField label="Tamanho do logotipo">
            <div class="flex gap-1">
              <UButton
                v-for="opt in logoSizeOptions"
                :key="opt.value"
                variant="ghost"
                size="xs"
                class="flex-1 justify-center transition-colors"
                :class="form.logoSize === opt.value ? activeBtn : inactiveBtn"
                @click="form.logoSize = opt.value"
                >{{ opt.label }}</UButton
              >
            </div>
          </EditorFormField>
          <EditorFormField label="Alinhamento">
            <div class="flex gap-1">
              <UButton
                v-for="opt in alignOptions"
                :key="opt.value"
                variant="ghost"
                size="xs"
                class="flex-1 justify-center transition-colors"
                :class="form.alignment === opt.value ? activeBtn : inactiveBtn"
                :aria-label="opt.label"
                @click="form.alignment = opt.value"
              >
                <UIcon :name="opt.icon" class="w-4 h-4" />
              </UButton>
            </div>
          </EditorFormField>
          <EditorFormField label="Nome da empresa">
            <UInput
              v-model="form.companyName"
              placeholder="Ex: Studio Forma"
              :maxlength="50"
              :ui="inputUi"
            />
          </EditorFormField>
          <EditorFormField label="Descrição / tagline">
            <div class="flex flex-col gap-1">
              <UTextarea
                v-model="form.description"
                placeholder="Descreva sua empresa em algumas palavras…"
                :maxlength="200"
                :rows="3"
                :ui="inputUi"
              />
              <span
                class="text-[.72rem] text-[var(--color-placeholder)] text-right px-1"
                >{{ form.description.length }}/200</span
              >
            </div>
          </EditorFormField>
        </template>

        <template v-if="activeTab === 'contact'">
          <EditorFormField label="Telefone">
            <UInput
              v-model="form.phone"
              v-maska="'(##) #####-####'"
              placeholder="(11) 90000-0000"
              type="tel"
              :ui="inputUi"
            />
          </EditorFormField>
          <EditorFormField label="E-mail">
            <div class="flex flex-col gap-1">
              <UInput
                v-model="form.email"
                placeholder="contato@empresa.com.br"
                type="email"
                :ui="inputUi"
              />
              <span
                v-if="form.email && !emailValido"
                class="text-[.72rem] text-[var(--color-negative)] px-1"
                >E-mail inválido</span
              >
            </div>
          </EditorFormField>
          <EditorFormField label="Site">
            <UInput
              v-model="form.website"
              placeholder="www.empresa.com.br"
              type="url"
              :ui="inputUi"
            />
          </EditorFormField>
        </template>

        <template v-if="activeTab === 'colors'">
          <div class="grid grid-cols-2 gap-2.5">
            <EditorFormColorPicker
              v-for="(label, key) in colorFields"
              :key="key"
              v-model="form[key as ColorKey]"
              :label="label"
            />
          </div>
        </template>

        <template v-if="activeTab === 'background'">
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
          <EditorFormField label="Transparência">
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
              <span
                class="text-[.78rem] text-[var(--color-text)] min-w-8 text-right"
                >{{ Math.round(form.bgOpacity * 100) }}%</span
              >
            </div>
          </EditorFormField>
        </template>

        <template v-if="activeTab === 'pattern'">
          <EditorFormPatternPicker
            v-model="form.pattern"
            v-model:patternOnFront="form.patternOnFront"
            :accent-color="form.accentColor"
            :bg-color="form.backColor"
          />
        </template>
      </div>

      <div class="shrink-0 px-4 py-3 border-t border-[var(--color-secondary)]">
        <UButton
          block
          size="lg"
          :loading="isGenerating"
          :disabled="!formValid || isGenerating"
          :color="isDark ? 'secondary' : 'primary'"
          class="text-white hover:opacity-90"
          @click="emit('generate')"
        >
          {{ isGenerating ? "Gerando PDF…" : "↓ Baixar PDF (frente + verso)" }}
        </UButton>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

defineProps<{ isGenerating: boolean; formValid: boolean }>();
const emit = defineEmits<{ generate: [] }>();

type ColorKey = "backgroundColor" | "textColor" | "accentColor" | "backColor";
type Form = {
  companyName: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  backColor: string;
  pattern: string;
  patternOnFront: boolean;
  bgOpacity: number;
  alignment: "left" | "center" | "right" | "custom";
  logoSize: "sm" | "md" | "lg";
};

const form = defineModel<Form>("form", { required: true });
const logoPreview = defineModel<string | null>("logoPreview");
const bgImages = defineModel<Record<string, string | null>>("bgImages", {
  required: true,
});

const activeTab = ref("identity");

const tabs = [
  {
    key: "identity",
    label: "Identidade",
    shortLabel: "ID",
    icon: "mdi:domain",
  },
  {
    key: "contact",
    label: "Contato",
    shortLabel: "Contato",
    icon: "mdi:card-account-phone",
  },
  { key: "colors", label: "Cores", shortLabel: "Cor", icon: "mdi:palette" },
  { key: "background", label: "Fundo", shortLabel: "Fundo", icon: "mdi:image" },
  { key: "pattern", label: "Padrão", shortLabel: "Patrões", icon: "mdi:shape" },
];

const currentTab = computed(() => tabs.find((t) => t.key === activeTab.value));

const emailValido = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email),
);

const activeBtn =
  "bg-[var(--color-primary)] dark:bg-[var(--color-secondary)] text-white dark:text-[var(--color-primary)]";
const inactiveBtn =
  "border border-[var(--color-secondary)] text-[var(--color-text)]";

const logoSizeOptions = [
  { value: "sm" as const, label: "P" },
  { value: "md" as const, label: "M" },
  { value: "lg" as const, label: "G" },
];

const alignOptions = [
  {
    value: "custom" as const,
    label: "Original",
    icon: "mdi:format-align-justify",
  },
  { value: "left" as const, label: "Esquerda", icon: "mdi:format-align-left" },
  {
    value: "center" as const,
    label: "Centro",
    icon: "mdi:format-align-center",
  },
  { value: "right" as const, label: "Direita", icon: "mdi:format-align-right" },
];

const inputUi = {
  root: "w-full",
  base: "w-full border border-[var(--color-secondary)] text-[var(--color-text)] focus:border-[var(--color-primary)] transition-colors bg-transparent",
  placeholder: "text-[var(--color-placeholder)]",
};

const uploadUi = {
  base: "border-2 border-dashed border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/20 transition-colors w-full",
};

const colorFields: Record<ColorKey, string> = {
  backgroundColor: "Fundo frente",
  textColor: "Texto",
  accentColor: "Destaque",
  backColor: "Fundo verso",
};

const bgUploads = [
  { key: "front", label: "Frente" },
  { key: "back", label: "Verso" },
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

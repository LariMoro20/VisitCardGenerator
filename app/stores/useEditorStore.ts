import { defineStore } from "pinia";

const STORAGE_KEY = "visitcard:form";
const STORAGE_IMAGES_KEY = "visitcard:images";
const STORAGE_LOGO_KEY = "visitcard:logo";

export const DEFAULT_FORM = {
  companyName: "",
  description: "",
  phone: "",
  email: "",
  website: "",
  address: "",
  backgroundColor: "#1a1a2e",
  textColor: "#e8e4dc",
  accentColor: "#c9a96e",
  backColor: "#111827",
  pattern: "circles",
  patternOnFront: false,
  patternFront: "solid",
  patternOpacity: 1,
  bgOpacity: 0.55,
  alignment: "custom" as "left" | "center" | "right" | "custom",
  logoSize: "md" as "sm" | "md" | "lg",
};

export type EditorForm = typeof DEFAULT_FORM;

export const useEditorStore = defineStore("editor", () => {
  const form = reactive<EditorForm>({ ...DEFAULT_FORM });
  const logoPreview = ref<string | null>(null);
  const bgImages = ref<Record<string, string | null>>({
    front: null,
    back: null,
  });

  const cardFrontProps = computed(() => ({
    companyName: form.companyName,
    description: form.description,
    phone: form.phone,
    email: form.email,
    website: form.website,
    address: form.address,
    backgroundColor: form.backgroundColor,
    textColor: form.textColor,
    accentColor: form.accentColor,
    bgImage: bgImages.value.front,
    bgOpacity: form.bgOpacity,
    logo: logoPreview.value,
    pattern: form.patternOnFront ? form.patternFront : "solid",
    patternOpacity: form.patternOpacity,
    alignment: form.alignment,
    logoSize: form.logoSize,
  }));

  const cardBackProps = computed(() => ({
    companyName: form.companyName,
    description: form.description,
    backgroundColor: form.backColor,
    textColor: form.textColor,
    accentColor: form.accentColor,
    bgImage: bgImages.value.back,
    bgOpacity: form.bgOpacity,
    logo: logoPreview.value,
    pattern: form.pattern,
    patternOpacity: form.patternOpacity,
    logoSize: form.logoSize,
  }));

  const isFormValid = computed(() => form.companyName.trim().length > 0);

  function save() {
    if (!import.meta.client) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...form }));
      localStorage.setItem(STORAGE_IMAGES_KEY, JSON.stringify(bgImages.value));
      if (logoPreview.value)
        localStorage.setItem(STORAGE_LOGO_KEY, logoPreview.value);
      else localStorage.removeItem(STORAGE_LOGO_KEY);
    } catch {}
  }

  function load() {
    if (!import.meta.client) return;
    try {
      const savedForm = localStorage.getItem(STORAGE_KEY);
      const savedImages = localStorage.getItem(STORAGE_IMAGES_KEY);
      const savedLogo = localStorage.getItem(STORAGE_LOGO_KEY);
      if (savedForm)
        Object.assign(form, { ...DEFAULT_FORM, ...JSON.parse(savedForm) });
      if (savedImages) bgImages.value = JSON.parse(savedImages);
      if (savedLogo) logoPreview.value = savedLogo;
    } catch {}
  }

  function reset() {
    Object.assign(form, { ...DEFAULT_FORM });
    logoPreview.value = null;
    bgImages.value = { front: null, back: null };
    if (!import.meta.client) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_IMAGES_KEY);
    localStorage.removeItem(STORAGE_LOGO_KEY);
  }

  return {
    form,
    logoPreview,
    bgImages,
    cardFrontProps,
    cardBackProps,
    isFormValid,
    save,
    load,
    reset,
  };
});

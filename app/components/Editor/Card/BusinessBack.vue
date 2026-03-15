<template>
  <div :style="cardStyle">
    <img v-if="bgImage" :src="bgImage" :style="layerFull" />
    <div
      v-if="bgImage"
      :style="{
        position: 'absolute',
        inset: '0',
        background: backgroundColor,
        opacity: String(bgOpacity),
      }"
    />
    <svg
      viewBox="0 0 520 296"
      preserveAspectRatio="xMidYMid slice"
      :style="{ ...layerFull, opacity: patternOpacity }"
      v-html="patternSvg"
    />
    <div
      style="
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        z-index: 10;
      "
    >
      <img v-if="logo" :src="logo" :style="logoImgStyle" />
      <div v-else :style="logoPlaceholderStyle">{{ initial }}</div>
      <div
        :style="{
          fontFamily: `'Playfair Display', serif`,
          fontSize: '1.05rem',
          fontWeight: '700',
          letterSpacing: '0.04em',
          color: textColor,
        }"
      >
        {{ companyName || "Nome da Empresa" }}
      </div>
      <div
        v-if="description"
        :style="{
          fontSize: '0.62rem',
          fontWeight: '300',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          opacity: '0.6',
          textAlign: 'center',
          maxWidth: '300px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          color: textColor,
        }"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PATTERNS } from "../../../utils/patterns";

const props = defineProps<{
  companyName: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  bgImage?: string | null;
  bgOpacity: number;
  logo?: string | null;
  pattern: string;
  patternOpacity?: number;
  logoSize?: "sm" | "md" | "lg";
}>();

const { backgroundColor, bgOpacity, pattern, accentColor } = toRefs(props);

const patternOpacity = computed(() => props.patternOpacity ?? 1);

const initial = computed(() => props.companyName?.[0]?.toUpperCase() ?? "?");
const patternSvg = computed(
  () =>
    PATTERNS.find((p) => p.id === pattern.value)?.render(accentColor.value) ??
    "",
);

const LOGO_SIZES_BACK = { sm: "48px", md: "68px", lg: "90px" };

const logoImgStyle = computed(() => ({
  height: LOGO_SIZES_BACK[props.logoSize ?? "md"],
  width: "auto",
  objectFit: "contain",
  display: "block",
}));

const logoPlaceholderStyle = computed(() => {
  const size = LOGO_SIZES_BACK[props.logoSize ?? "md"];
  return {
    width: size,
    height: size,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.7rem",
    fontWeight: "700",
    background: accentColor.value + "25",
    color: accentColor.value,
  };
});

const cardStyle = computed(() => ({
  width: "520px",
  height: "296px",
  fontFamily: "'DM Sans', sans-serif",
  background: backgroundColor.value,
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
}));

const layerFull = {
  position: "absolute",
  inset: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
</script>
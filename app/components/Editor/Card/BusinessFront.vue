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
      v-if="pattern !== 'solid'"
      viewBox="0 0 520 296"
      preserveAspectRatio="xMidYMid slice"
      :style="layerFull"
      v-html="patternSvg"
    />

    <div
      :style="{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '4px',
        background: accentColor,
        zIndex: '10',
      }"
    />
    <div
      v-if="!bgImage"
      :style="{
        position: 'absolute',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        right: '-80px',
        top: '-80px',
        opacity: '0.12',
        zIndex: '1',
        background: accentColor,
      }"
    />

    <div :style="alignConfig.header">
      <template v-if="alignment !== 'center'">
        <div v-if="alignConfig.logoFirst" style="flex-shrink: 0">
          <img v-if="logo" :src="logo" :style="logoImgStyle" />
          <div v-else :style="logoPlaceholderStyle">{{ initial }}</div>
        </div>
      </template>

      <div :style="alignConfig.textBlock">
        <div
          :style="{
            fontFamily: `'Playfair Display', serif`,
            fontSize: '1.2rem',
            fontWeight: '700',
            lineHeight: '1.2',
            color: textColor,
          }"
        >
          {{ companyName || "Nome da Empresa" }}
        </div>
        <div
          v-if="description"
          :style="{
            fontSize: '0.67rem',
            fontWeight: '300',
            opacity: '0.75',
            marginTop: '6px',
            lineHeight: '1.55',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: textColor,
          }"
        >
          {{ description }}
        </div>
      </div>

      <template v-if="alignment === 'center'">
        <div style="flex-shrink: 0">
          <img v-if="logo" :src="logo" :style="logoImgStyle" />
          <div v-else :style="logoPlaceholderStyle">{{ initial }}</div>
        </div>
      </template>

      <template v-if="alignment !== 'center' && !alignConfig.logoFirst">
        <div style="flex-shrink: 0">
          <img v-if="logo" :src="logo" :style="logoImgStyle" />
          <div v-else :style="logoPlaceholderStyle">{{ initial }}</div>
        </div>
      </template>
    </div>

    <div
      :style="{
        position: 'relative',
        zIndex: '10',
        height: '1px',
        opacity: '0.2',
        background: textColor,
      }"
    />

    <div
      :style="{
        position: 'relative',
        zIndex: '10',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        alignItems: alignConfig.contactAlign,
      }"
    >
      <div v-if="phone" :style="contactRow">
        <span :style="iconWrap" v-html="phoneIcon" />
        <span style="line-height: 1">{{ phone }}</span>
      </div>
      <div v-if="email" :style="contactRow">
        <span :style="iconWrap" v-html="emailIcon" />
        <span style="line-height: 1">{{ email }}</span>
      </div>
      <div v-if="website" :style="contactRow">
        <span :style="iconWrap" v-html="globeIcon" />
        <span style="line-height: 1">{{ website }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PATTERNS } from "../../../utils/patterns";

const props = defineProps<{
  companyName: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  bgImage?: string | null;
  bgOpacity: number;
  logo?: string | null;
  pattern: string;
  alignment?: "left" | "center" | "right" | "custom";
}>();

const { backgroundColor, textColor, accentColor, bgOpacity, pattern } =
  toRefs(props);

const alignment = computed(() => props.alignment ?? "custom");
const initial = computed(() => props.companyName?.[0]?.toUpperCase() ?? "?");
const patternSvg = computed(
  () =>
    PATTERNS.find((p) => p.id === pattern.value)?.render(accentColor.value) ??
    "",
);

type AlignConfig = {
  header: Record<string, string>;
  textBlock: Record<string, string>;
  contactAlign: string;
  logoFirst: boolean;
};

const ALIGN_MAP: Record<string, AlignConfig> = {
  custom: {
    header: {
      position: "relative",
      zIndex: "10",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px",
    },
    textBlock: { flex: "1", minWidth: "0", textAlign: "right" },
    contactAlign: "flex-start",
    logoFirst: true,
  },
  left: {
    header: {
      position: "relative",
      zIndex: "10",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: "16px",
    },
    textBlock: { flex: "1", minWidth: "0", textAlign: "left" },
    contactAlign: "flex-start",
    logoFirst: true,
  },
  center: {
    header: {
      position: "relative",
      zIndex: "10",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
    },
    textBlock: { textAlign: "center" },
    contactAlign: "center",
    logoFirst: false,
  },
  right: {
    header: {
      position: "relative",
      zIndex: "10",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px",
    },
    textBlock: { flex: "1", minWidth: "0", textAlign: "right" },
    contactAlign: "flex-end",
    logoFirst: false,
  },
};

const alignConfig = computed(
  () => ALIGN_MAP[alignment.value] ?? ALIGN_MAP.custom,
);

const logoImgStyle = {
  width: "50px",
  height: "50px",
  objectFit: "contain",
  borderRadius: "8px",
  display: "block",
};

const logoPlaceholderStyle = computed(() => ({
  width: "50px",
  height: "50px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.1rem",
  fontWeight: "700",
  background: accentColor.value + "22",
  color: accentColor.value,
}));

const cardStyle = computed(() => ({
  width: "520px",
  height: "296px",
  padding: "28px 34px 26px",
  fontFamily: "'DM Sans', sans-serif",
  background: backgroundColor.value,
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxSizing: "border-box",
}));

const layerFull = {
  position: "absolute",
  inset: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
const contactRow = computed(() => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.7rem",
  opacity: "0.85",
  color: textColor.value,
}));
const iconWrap = {
  width: "15px",
  height: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: "0",
  opacity: "0.75",
};

const icon = (path: string) =>
  computed(
    () =>
      `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${accentColor.value}" stroke-width="2" stroke-linecap="round" style="display:block">${path}</svg>`,
  );

const phoneIcon = icon(
  `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>`,
);
const emailIcon = icon(
  `<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`,
);
const globeIcon = icon(
  `<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
);
</script>

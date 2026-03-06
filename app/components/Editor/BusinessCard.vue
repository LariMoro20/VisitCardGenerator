<template>
  <div :style="cardStyle">
    <img v-if="bgImage" :src="bgImage" :style="layerFull" />
    <div
      v-if="bgImage"
      :style="{
        position: 'absolute',
        inset: '0',
        background: corFundo,
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
        background: corDestaque,
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
        background: corDestaque,
      }"
    />

    <div
      :style="{
        position: 'relative',
        zIndex: '10',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
      }"
    >
      <div style="flex-shrink: 0">
        <img
          v-if="logo"
          :src="logo"
          :style="{
            width: '50px',
            height: '50px',
            objectFit: 'contain',
            borderRadius: '8px',
            display: 'block',
          }"
        />
        <div
          v-else
          :style="{
            width: '50px',
            height: '50px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            fontWeight: '700',
            background: corDestaque + '22',
            color: corDestaque,
          }"
        >
          {{ initial }}
        </div>
      </div>
      <div style="text-align: right; flex: 1; min-width: 0">
        <div
          :style="{
            fontFamily: `'Playfair Display', serif`,
            fontSize: '1.2rem',
            fontWeight: '700',
            lineHeight: '1.2',
            color: corTexto,
          }"
        >
          {{ empresa || "Nome da Empresa" }}
        </div>
        <div
          v-if="descricao"
          :style="{
            fontSize: '0.67rem',
            fontWeight: '300',
            opacity: '0.75',
            marginTop: '6px',
            lineHeight: '1.55',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: corTexto,
          }"
        >
          {{ descricao }}
        </div>
      </div>
    </div>

    <div
      :style="{
        position: 'relative',
        zIndex: '10',
        height: '1px',
        opacity: '0.2',
        background: corTexto,
      }"
    />

    <div
      :style="{
        position: 'relative',
        zIndex: '10',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }"
    >
      <div v-if="telefone" :style="contactRow">
        <span :style="iconWrap" v-html="phoneIcon" />
        <span style="line-height: 1">{{ telefone }}</span>
      </div>
      <div v-if="email" :style="contactRow">
        <span :style="iconWrap" v-html="emailIcon" />
        <span style="line-height: 1">{{ email }}</span>
      </div>
      <div v-if="site" :style="contactRow">
        <span :style="iconWrap" v-html="globeIcon" />
        <span style="line-height: 1">{{ site }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PATTERNS } from "../../utils/patterns";

const props = defineProps<{
  empresa: string;
  descricao: string;
  telefone: string;
  email: string;
  site: string;
  corFundo: string;
  corTexto: string;
  corDestaque: string;
  bgImage?: string | null;
  bgOpacity: number;
  logo?: string | null;
  padrao: string;
}>();

const { corFundo, corTexto, corDestaque, bgOpacity, padrao } = toRefs(props);

const initial = computed(() => props.empresa?.[0]?.toUpperCase() ?? "?");
const patternSvg = computed(
  () =>
    PATTERNS.find((p) => p.id === padrao.value)?.render(corDestaque.value) ??
    "",
);

const cardStyle = computed(() => ({
  width: "520px",
  height: "296px",
  padding: "28px 34px 26px",
  fontFamily: "'DM Sans', sans-serif",
  background: corFundo.value,
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
  color: corTexto.value,
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
      `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${corDestaque.value}" stroke-width="2" stroke-linecap="round" style="display:block">${path}</svg>`,
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

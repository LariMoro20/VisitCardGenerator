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
      viewBox="0 0 520 296"
      preserveAspectRatio="xMidYMid slice"
      :style="layerFull"
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
      <img
        v-if="logo"
        :src="logo"
        style="width: 68px; height: 68px; object-fit: contain; display: block"
      />
      <div
        v-else
        :style="{
          width: '68px',
          height: '68px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.7rem',
          fontWeight: '700',
          background: corDestaque + '25',
          color: corDestaque,
        }"
      >
        {{ initial }}
      </div>
      <div
        :style="{
          fontFamily: `'Playfair Display', serif`,
          fontSize: '1.05rem',
          fontWeight: '700',
          letterSpacing: '0.04em',
          color: corTexto,
        }"
      >
        {{ empresa || "Nome da Empresa" }}
      </div>
      <div
        v-if="descricao"
        :style="{
          fontSize: '0.62rem',
          fontWeight: '300',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          opacity: '0.6',
          textAlign: 'center',
          maxWidth: '300px',
          whiteSpace: 'pre-wrap',
          color: corTexto,
        }"
      >
        {{ descricao }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PATTERNS } from "../../../utils/patterns";

const props = defineProps<{
  empresa: string;
  descricao: string;
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
  fontFamily: "'DM Sans', sans-serif",
  background: corFundo.value,
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

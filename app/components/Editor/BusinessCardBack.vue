<template>
  <div :style="cardStyle">
    <img v-if="bgImage" :src="bgImage" :style="layerFull" />
    <div v-if="bgImage" :style="overlayStyle" />

    <svg
      viewBox="0 0 520 296"
      preserveAspectRatio="xMidYMid slice"
      :style="layerFull"
      v-html="patternSvg"
    />

    <div :style="centerStyle">
      <img v-if="logo" :src="logo" :style="logoImgStyle" />
      <div v-else :style="logoPhStyle">{{ initial }}</div>
      <div :style="nameStyle">{{ empresa || 'Nome da Empresa' }}</div>
      <div v-if="descricao" :style="descStyle">{{ descricao }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PATTERNS } from './patterns'

const props = defineProps<{
  empresa: string
  descricao: string
  corFundo: string
  corTexto: string
  corDestaque: string
  bgImage?: string | null
  bgOpacity: number
  logo?: string | null
  padrao: string
}>()

const initial = computed(() => props.empresa ? props.empresa[0].toUpperCase() : '?')
const patternSvg = computed(() => PATTERNS.find(p => p.id === props.padrao)?.render(props.corDestaque) ?? '')

const cardStyle = computed(() => ({
  width: '520px',
  height: '296px',
  fontFamily: "'DM Sans', sans-serif",
  background: props.corFundo,
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
}))

const layerFull = {
  position: 'absolute',
  inset: '0',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}

const overlayStyle = computed(() => ({
  position: 'absolute',
  inset: '0',
  background: props.corFundo,
  opacity: String(props.bgOpacity),
}))

const centerStyle = {
  position: 'absolute',
  inset: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  zIndex: '10',
}

const logoImgStyle = {
  width: '68px',
  height: '68px',
  objectFit: 'contain',
  display: 'block',
}

const logoPhStyle = computed(() => ({
  width: '68px',
  height: '68px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.7rem',
  fontWeight: '700',
  background: props.corDestaque + '25',
  color: props.corDestaque,
}))

const nameStyle = computed(() => ({
  fontFamily: "'Playfair Display', serif",
  fontSize: '1.05rem',
  fontWeight: '700',
  letterSpacing: '0.04em',
  color: props.corTexto,
}))

const descStyle = computed(() => ({
  fontSize: '0.62rem',
  fontWeight: '300',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  opacity: '0.6',
  textAlign: 'center',
  maxWidth: '300px',
  whiteSpace: 'pre-wrap',
  color: props.corTexto,
}))
</script>

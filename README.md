# Visit Card Generator

> Gere cartões de visita profissionais em PDF — frente e verso — direto no navegador.

<br />

## Visão geral

Visit Card Generator é uma aplicação web para criação de cartões de visita personalizados com download em PDF. Todo o processamento acontece no client — nenhum dado é enviado para servidores.

- **Preview em tempo real** enquanto você edita
- **PDF frente e verso** no tamanho padrão 88,9 × 50,8 mm
- **8 padrões geométricos** para o verso
- Upload de logotipo e imagem de fundo com controle de opacidade
- Paleta de cores totalmente customizável
- Modo claro e escuro

<br />

## Stack

| | |
|---|---|
| Framework | [Nuxt 3](https://nuxt.com) |
| UI | [NuxtUI](https://ui.nuxt.com) + Tailwind CSS |
| PDF | [jsPDF](https://github.com/parallax/jsPDF) |
| Captura | [html-to-image](https://github.com/bubkoo/html-to-image) |
| Fontes | Playfair Display + DM Sans (Google Fonts) |

<br />

## Estrutura

```
pages/
  editor.vue                  ← página principal (state + gerarPDF)

components/Editor/
  BusinessCard.vue            ← cartão frente (inline styles, fonte única)
  BusinessCardBack.vue        ← cartão verso  (inline styles, fonte única)
  patterns.ts                 ← 8 padrões SVG compartilhados
  EditorForm.vue              ← painel de formulário
  EditorPreview.vue           ← painel de preview com tabs
  SectionLabel.vue
  FormField.vue
  ColorPicker.vue
  FileUploadBox.vue

layouts/
  default.vue                 ← OG Image + slot

```

<br />

## Como rodar

```bash
# instalar dependências
npm install

# desenvolvimento
npm run dev

# build para produção
npm run build
```

<br />

## Decisões técnicas

**Por que `html-to-image` em vez de `html2canvas`?**
O Tailwind v4 usa `oklch()` nas variáveis CSS. O `html2canvas` não suporta essa função de cor e lançava erro na captura. O `html-to-image` usa a API nativa do browser (`foreignObject` em SVG) e lida com CSS moderno sem problemas. A flag `skipFonts: true` é necessária para evitar erro de CORS ao tentar embutir fontes do Google Fonts.

**Por que os componentes de cartão usam 100% `style` inline?**
O `html-to-image` captura o elemento diretamente do DOM. Classes Tailwind dependem de stylesheets externos — se removidas ou não resolvidas no clone, o layout quebra. Com `style` inline, o componente é a fonte única de verdade tanto para o preview quanto para o PDF, sem nenhuma lógica de reconstrução.

<br />

## Licença

MIT

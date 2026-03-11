# VisitCardGenerator

> Gere cartões de visita profissionais em PDF, frente e verso, direto no navegador.

## Visão geral

VisitCardGenerator é uma aplicação web para criação de cartões de visita personalizados com download em PDF. Todo o processamento acontece no client, nenhum dado é enviado para servidores.

- **Preview em tempo real** enquanto você edita
- **PDF frente e verso** no tamanho padrão 88,9 × 50,8 mm
- **8 padrões geométricos** para o verso
- Upload de logotipo e imagem de fundo com controle de opacidade
- Paleta de cores totalmente customizável
- Modo claro e escuro
- Layout responsivo, funciona em mobile e desktop

## Stack

|           |                                                          |
| --------- | -------------------------------------------------------- |
| Framework | [Nuxt 3](https://nuxt.com)                               |
| UI        | [NuxtUI](https://ui.nuxt.com) + Tailwind CSS             |
| Animações | [motion-vue](https://motion.unovue.com/)                 |
| PDF       | [jsPDF](https://github.com/parallax/jsPDF)               |
| Captura   | [html-to-image](https://github.com/bubkoo/html-to-image) |
| Máscaras  | [maska](https://beholdr.github.io/maska/)                |
| Fontes    | Playfair Display + DM Sans (Google Fonts)                |

## Estrutura

```
layouts/
  EditorLayout.vue            ← layout com header/footer do editor
  LandPageLayout.vue          ← layout da landing page

pages/
  index.vue                   ← landing page
  editor.vue                  ← estado global + gerarPDF

components/
  Animations/
    Reveal.vue                ← animação de entrada com motion-vue

  Editor/
    Card/
      BusinessFront.vue       ← cartão frente (inline styles, fonte única)
      BusinessBack.vue        ← cartão verso  (inline styles, fonte única)
      Preview.vue             ← preview com tabs + scale responsivo
    Form/
      index.vue               ← painel principal do formulário
      Field.vue               ← wrapper de campo com label
      Label.vue               ← label de seção
      ColorPicker.vue         ← input de cor com preview
      PatternPicker.vue       ← seletor de padrões geométricos
    Header.vue                ← header do editor
    Footer.vue                ← footer do editor

  LandingPage/
    Hero.vue                  ← seção hero com CTA
    Editor.vue                ← seção "Conheça o editor" com cards
    CTA.vue                   ← seção call-to-action
    Author.vue                ← seção sobre a autora
    ProjectStack.vue          ← logos das tecnologias usadas
    Card.vue                  ← card de feature reutilizável
    Header.vue                ← header com navegação e drawer mobile
    Footer.vue                ← footer da landing
    Lightbox.vue              ← lightbox de screenshots
    FAQ.vue                   ← seção de perguntas frequentes

  OgImage/
    VisitCardOg.vue           ← componente de OG Image personalizado

  patterns.ts                 ← 8 padrões SVG compartilhados
```

## Como rodar

```bash
# instalar dependências
npm install

# desenvolvimento
npm run dev

# build para produção
npm run build
```

## Decisões técnicas

**Por que `html-to-image` em vez de `html2canvas`?**
O Tailwind v4 usa `oklch()` nas variáveis CSS. O `html2canvas` não suporta essa função de cor e lançava erro na captura. O `html-to-image` usa a API nativa do browser (`foreignObject` em SVG) e lida com CSS moderno sem problemas. A flag `skipFonts: true` é necessária para evitar erro de CORS ao tentar embutir fontes do Google Fonts.

**Por que os componentes de cartão usam 100% `style` inline?**
O `html-to-image` captura o elemento diretamente do DOM. Classes Tailwind dependem de stylesheets externos — se não resolvidas no clone, o layout quebra. Com `style` inline, o componente é a fonte única de verdade tanto para o preview quanto para o PDF, sem nenhuma lógica de reconstrução.

**Responsividade do preview**
O cartão tem dimensões fixas em px (520×296) necessárias para o PDF. Para funcionar em telas menores, o preview usa `transform: scale()` calculado dinamicamente. O wrapper compensa o espaço com `width/height` proporcionais ao scale, evitando cortes ou espaços em branco.

**Layouts por rota com `definePageMeta`**
O Nuxt não usa `router.ts` manual como no Vue puro — o roteamento é baseado em arquivos. Para definir o layout por rota, foi usado `definePageMeta({ layout: 'editor-layout' })`, equivalente ao `meta: {}` do Vue Router tradicional, mas integrado ao sistema de arquivos do Nuxt.

## Licença

MIT com obrigatoriedade de atribuição para uso comercial.

Você pode fazer fork, modificar e distribuir livremente. Para uso **comercial ou profissional** (SaaS, projetos de clientes, serviços pagos) é obrigatório incluir crédito visível na interface da aplicação:

```
Baseado em VisitCardGenerator — github.com/LariMoro20/VisitCardGenerator
```

Uso pessoal e educacional é livre, sem restrições. Veja o arquivo [`LICENSE`](./LICENSE) para os termos completos.

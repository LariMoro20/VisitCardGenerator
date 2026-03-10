<template>
  <UContainer class="py-16 scroll-mt-20" id="faq">
    <AnimationsReveal :duration="2" direction="up" type="fade-slide">
      <h2
        class="text-3xl lg:text-4xl font-bold text-center text-[var(--color-primary)] dark:text-[var(--color-secondary)] mb-10"
      >
        Dúvidas frequentes
      </h2>

      <div class="mx-auto pb-4">
        <UAccordion
          :items="faq"
          :ui="{
            item: 'border border-[var(--color-secondary)]/30 rounded-xl mb-2 px-4 hover:border-[var(--color-secondary)] transition-colors cursor-pointer',
            trigger: 'cursor-pointer',
          }"
        />
      </div>
    </AnimationsReveal>
  </UContainer>
</template>

<script setup lang="ts">
const faq = [
  {
    label: "💸  É gratuito?",
    content: "Sim, 100% gratuito. Sem planos, sem limites e sem surpresas.",
  },
  {
    label: "🔓  Precisa de cadastro?",
    content:
      "Não. Acesse o editor diretamente, sem criar conta ou informar e-mail.",
  },
  {
    label: "📱  Funciona no celular?",
    content:
      "Sim, a landing page é totalmente responsiva. O editor funciona melhor em telas maiores pela quantidade de opções disponíveis.",
  },
  {
    label: "🖨️  O PDF tem qualidade para impressão profissional?",
    content:
      "Sim. O cartão é gerado no tamanho padrão 88,9 × 50,8 mm com alta resolução, pronto para enviar a uma gráfica.",
  },
  {
    label: "🔒  Meus dados ficam salvos?",
    content:
      "Não. Todo o processamento acontece no seu navegador e nenhum dado é enviado ou armazenado em servidores.",
  },
  {
    label: "💼  Posso usar para fins comerciais?",
    content:
      "Pode usar o cartão gerado livremente. Para usar o código do projeto em produtos comerciais, consulte a licença no repositório.",
  },
];
</script>

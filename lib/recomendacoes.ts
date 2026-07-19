export interface Recomendacao {
  titulo: string;
  descricao: string;
  categoria: string;
  impacto: "Alto" | "Médio" | "Baixo";
  prazo: "Imediato" | "Curto" | "Médio";
}

export function gerarRecomendacoes(score: {
  scoreGeral: number;
  scoreTrafego: number;
  scoreConversao: number;
  scoreRetencao: number;
  scoreOperacao: number;
}): Recomendacao[] {
  const recs: Recomendacao[] = [];

  const scores = [
    { nome: "trafego", valor: score.scoreTrafego, label: "Tráfego" },
    { nome: "conversao", valor: score.scoreConversao, label: "Conversão" },
    { nome: "retencao", valor: score.scoreRetencao, label: "Retenção" },
    { nome: "operacao", valor: score.scoreOperacao, label: "Operação" },
  ].sort((a, b) => a.valor - b.valor);

  const problemas: Record<string, Recomendacao[]> = {
    trafego: [
      {
        titulo: "Diversifique suas fontes de tráfego",
        descricao: "Você depende de poucas fontes. Expanda para Google Ads, SEO e redes sociais orgânicas para reduzir risco.",
        categoria: "Tráfego",
        impacto: "Alto",
        prazo: "Médio",
      },
      {
        titulo: "Invista em remarketing",
        descricao: "96% dos visitantes não compram na primeira vez. Campanhas de remarketing podem aumentar conversão em até 150%.",
        categoria: "Tráfego",
        impacto: "Alto",
        prazo: "Curto",
      },
    ],
    conversao: [
      {
        titulo: "Otimize seu checkout",
        descricao: "Simplifique o processo de compra. Reduza campos, ofereça PIX e parcelamento. Cada etapa a menos aumenta conversão em 10%.",
        categoria: "Conversão",
        impacto: "Alto",
        prazo: "Imediato",
      },
      {
        titulo: "Adicione prova social",
        descricao: "Depoimentos, avaliações e selos de segurança aumentam a confiança e podem elevar a taxa de conversão em até 34%.",
        categoria: "Conversão",
        impacto: "Médio",
        prazo: "Curto",
      },
    ],
    retencao: [
      {
        titulo: "Crie um programa de fidelidade",
        descricao: "Clientes fiéis gastam em média 67% a mais. Implemente pontos, descontos progressivos ou cashback.",
        categoria: "Retenção",
        impacto: "Alto",
        prazo: "Médio",
      },
      {
        titulo: "Email marketing pós-compra",
        descricao: "Sequências de emails pós-compra aumentam recompra em 30%. Inclua dicas de uso, solicitação de avaliação e ofertas exclusivas.",
        categoria: "Retenção",
        impacto: "Médio",
        prazo: "Curto",
      },
    ],
    operacao: [
      {
        titulo: "Reduza o tempo de entrega",
        descricao: "Cada dia a mais de entrega aumenta cancelamentos em 5%. Negocie com transportadoras ou considere fulfillment.",
        categoria: "Operação",
        impacto: "Alto",
        prazo: "Médio",
      },
      {
        titulo: "Melhore as fotos e descrições",
        descricao: "80% das devoluções são por expectativa vs realidade. Fotos profissionais e descrições detalhadas reduzem devoluções em até 40%.",
        categoria: "Operação",
        impacto: "Médio",
        prazo: "Curto",
      },
    ],
  };

  for (let i = 0; i < Math.min(3, scores.length); i++) {
    const cat = scores[i].nome;
    const recsCat = problemas[cat];
    if (recsCat && recsCat.length > 0) {
      recs.push(recsCat[0]);
    }
  }

  return recs;
}

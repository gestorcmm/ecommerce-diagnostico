export interface RespostasDiagnostico {
  pedidosMes: string;
  ticketMedio: string;
  taxaConversao: string;
  fonteTrafego: string;
  tempoEntrega: string;
  taxaDevolucao: string;
  investimentoMarketing: string;
  taxaRecompra: string;
}

export interface ScoreResultado {
  scoreGeral: number;
  scoreTrafego: number;
  scoreConversao: number;
  scoreRetencao: number;
  scoreOperacao: number;
  classificacao: string;
  cor: string;
}

export function calcularScore(respostas: RespostasDiagnostico): ScoreResultado {
  const pedidos = parseInt(respostas.pedidosMes) || 0;
  const ticket = parseFloat(respostas.ticketMedio) || 0;
  const conversao = parseFloat(respostas.taxaConversao) || 0;
  const entrega = parseInt(respostas.tempoEntrega) || 0;
  const devolucao = parseFloat(respostas.taxaDevolucao) || 0;
  const marketing = parseFloat(respostas.investimentoMarketing) || 0;
  const recompra = parseFloat(respostas.taxaRecompra) || 0;

  let scoreTrafego = 0;
  if (pedidos >= 500) scoreTrafego = 25;
  else if (pedidos >= 200) scoreTrafego = 20;
  else if (pedidos >= 100) scoreTrafego = 15;
  else if (pedidos >= 50) scoreTrafego = 10;
  else scoreTrafego = 5;

  if (marketing >= 5000) scoreTrafego += 0;
  else if (marketing >= 2000) scoreTrafego += 2;
  else if (marketing >= 500) scoreTrafego += 5;
  else scoreTrafego += 8;
  scoreTrafego = Math.min(25, scoreTrafego);

  let scoreConversao = 0;
  if (conversao >= 3) scoreConversao = 25;
  else if (conversao >= 2) scoreConversao = 20;
  else if (conversao >= 1) scoreConversao = 15;
  else if (conversao >= 0.5) scoreConversao = 10;
  else scoreConversao = 5;

  if (ticket >= 300) scoreConversao += 0;
  else if (ticket >= 150) scoreConversao += 3;
  else if (ticket >= 80) scoreConversao += 5;
  else scoreConversao += 8;
  scoreConversao = Math.min(25, scoreConversao);

  let scoreRetencao = 0;
  if (recompra >= 40) scoreRetencao = 25;
  else if (recompra >= 25) scoreRetencao = 20;
  else if (recompra >= 15) scoreRetencao = 15;
  else if (recompra >= 5) scoreRetencao = 10;
  else scoreRetencao = 5;

  let scoreOperacao = 25;
  if (entrega > 7) scoreOperacao -= 10;
  else if (entrega > 5) scoreOperacao -= 5;
  else if (entrega > 3) scoreOperacao -= 2;

  if (devolucao > 10) scoreOperacao -= 10;
  else if (devolucao > 5) scoreOperacao -= 5;
  else if (devolucao > 2) scoreOperacao -= 2;

  scoreOperacao = Math.max(0, Math.min(25, scoreOperacao));

  const scoreGeral = Math.round(scoreTrafego + scoreConversao + scoreRetencao + scoreOperacao);

  let classificacao = "";
  let cor = "";

  if (scoreGeral >= 81) {
    classificacao = "Excelente";
    cor = "#22c55e";
  } else if (scoreGeral >= 61) {
    classificacao = "Bom";
    cor = "#00d4ff";
  } else if (scoreGeral >= 41) {
    classificacao = "Atenção";
    cor = "#eab308";
  } else {
    classificacao = "Crítico";
    cor = "#ef4444";
  }

  return { scoreGeral, scoreTrafego, scoreConversao, scoreRetencao, scoreOperacao, classificacao, cor };
}

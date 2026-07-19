"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Store, ShoppingCart, TrendingUp, Zap, Megaphone, Truck, RotateCcw, Users } from "lucide-react";
import { calcularScore, RespostasDiagnostico } from "@/lib/scoreCalculator";
import { gerarRecomendacoes } from "@/lib/recomendacoes";
import ScoreGauge from "./ScoreGauge";
import EmailCapture from "./EmailCapture";

const perguntas = [
  {
    id: "pedidosMes" as const,
    icone: ShoppingCart,
    pergunta: "Quantos pedidos sua loja faz por mês?",
    opcoes: [
      { valor: "10", label: "Até 10 pedidos" },
      { valor: "50", label: "11 a 50 pedidos" },
      { valor: "100", label: "51 a 100 pedidos" },
      { valor: "200", label: "101 a 200 pedidos" },
      { valor: "500", label: "Mais de 200 pedidos" },
    ],
  },
  {
    id: "ticketMedio" as const,
    icone: TrendingUp,
    pergunta: "Qual o ticket médio dos seus pedidos?",
    opcoes: [
      { valor: "50", label: "Até R$ 50" },
      { valor: "80", label: "R$ 51 a R$ 80" },
      { valor: "150", label: "R$ 81 a R$ 150" },
      { valor: "300", label: "R$ 151 a R$ 300" },
      { valor: "500", label: "Acima de R$ 300" },
    ],
  },
  {
    id: "taxaConversao" as const,
    icone: Zap,
    pergunta: "Qual a taxa de conversão da sua loja?",
    opcoes: [
      { valor: "0.3", label: "Menos de 0,5%" },
      { valor: "0.8", label: "0,5% a 1%" },
      { valor: "1.5", label: "1% a 2%" },
      { valor: "3", label: "2% a 3%" },
      { valor: "5", label: "Mais de 3%" },
    ],
  },
  {
    id: "fonteTrafego" as const,
    icone: Megaphone,
    pergunta: "Qual a principal fonte de tráfego?",
    opcoes: [
      { valor: "organico", label: "Google Orgânico / SEO" },
      { valor: "pago", label: "Google Ads / Meta Ads" },
      { valor: "social", label: "Redes Sociais (Orgânico)" },
      { valor: "direto", label: "Tráfego Direto / Email" },
      { valor: "marketplace", label: "Marketplace (ML, Shopee)" },
    ],
  },
  {
    id: "tempoEntrega" as const,
    icone: Truck,
    pergunta: "Qual o tempo médio de entrega?",
    opcoes: [
      { valor: "2", label: "1 a 2 dias úteis" },
      { valor: "4", label: "3 a 5 dias úteis" },
      { valor: "7", label: "6 a 10 dias úteis" },
      { valor: "12", label: "11 a 15 dias úteis" },
      { valor: "20", label: "Mais de 15 dias" },
    ],
  },
  {
    id: "taxaDevolucao" as const,
    icone: RotateCcw,
    pergunta: "Qual a taxa de devolução/troca?",
    opcoes: [
      { valor: "1", label: "Menos de 2%" },
      { valor: "3", label: "2% a 5%" },
      { valor: "7", label: "5% a 10%" },
      { valor: "12", label: "10% a 15%" },
      { valor: "20", label: "Mais de 15%" },
    ],
  },
  {
    id: "investimentoMarketing" as const,
    icone: Megaphone,
    pergunta: "Quanto investe em marketing/mês?",
    opcoes: [
      { valor: "0", label: "Não invisto" },
      { valor: "500", label: "Até R$ 500" },
      { valor: "2000", label: "R$ 500 a R$ 2.000" },
      { valor: "5000", label: "R$ 2.000 a R$ 5.000" },
      { valor: "10000", label: "Mais de R$ 5.000" },
    ],
  },
  {
    id: "taxaRecompra" as const,
    icone: Users,
    pergunta: "Qual a taxa de recompra dos clientes?",
    opcoes: [
      { valor: "5", label: "Menos de 10%" },
      { valor: "15", label: "10% a 20%" },
      { valor: "30", label: "20% a 40%" },
      { valor: "50", label: "40% a 60%" },
      { valor: "70", label: "Mais de 60%" },
    ],
  },
];

export default function DiagnosticoForm() {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<Partial<RespostasDiagnostico>>({});
  const [resultado, setResultado] = useState<ReturnType<typeof calcularScore> | null>(null);
  const [recomendacoes, setRecomendacoes] = useState<ReturnType<typeof gerarRecomendacoes>>([]);
  const [direcao, setDirecao] = useState(1);

  const handleResposta = (valor: string) => {
    const perguntaAtual = perguntas[etapa];
    const novasRespostas = { ...respostas, [perguntaAtual.id]: valor };
    setRespostas(novasRespostas);

    if (etapa < perguntas.length - 1) {
      setDirecao(1);
      setEtapa(etapa + 1);
    } else {
      const score = calcularScore(novasRespostas as RespostasDiagnostico);
      const recs = gerarRecomendacoes(score);
      setResultado(score);
      setRecomendacoes(recs);
    }
  };

  const handleVoltar = () => {
    if (etapa > 0) {
      setDirecao(-1);
      setEtapa(etapa - 1);
    }
  };

  const handleReiniciar = () => {
    setEtapa(0);
    setRespostas({});
    setResultado(null);
    setRecomendacoes([]);
    setDirecao(1);
  };

  if (resultado) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Resultado do Diagnóstico
          </h2>
          <p className="text-gray-400">Aqui está a saúde do seu e-commerce</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 flex flex-col items-center justify-center"
          >
            <ScoreGauge score={resultado.scoreGeral} color={resultado.cor} />
            <div className="mt-4 text-center">
              <span
                className="inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider"
                style={{ backgroundColor: resultado.cor + "20", color: resultado.cor, border: `1px solid ${resultado.cor}40` }}
              >
                {resultado.classificacao}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-8 space-y-5"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Pontuação por Categoria</h3>
            {[
              { label: "Tráfego", score: resultado.scoreTrafego, cor: "#a855f7" },
              { label: "Conversão", score: resultado.scoreConversao, cor: "#00d4ff" },
              { label: "Retenção", score: resultado.scoreRetencao, cor: "#22c55e" },
              { label: "Operação", score: resultado.scoreOperacao, cor: "#eab308" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="font-bold" style={{ color: item.cor }}>{item.score}/25</span>
                </div>
                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.score / 25) * 100}%` }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.cor }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent-yellow" />
            Top 3 Prioridades para Melhorar
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {recomendacoes.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="glass p-6 hover:border-accent-cyan/50 transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-accent-purple/20 text-accent-purple flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-accent-cyan uppercase">{rec.categoria}</span>
                </div>
                <h4 className="font-bold text-white mb-2">{rec.titulo}</h4>
                <p className="text-gray-400 text-sm mb-3">{rec.descricao}</p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-dark-800 text-gray-300">
                    Impacto: {rec.impacto}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-dark-800 text-gray-300">
                    Prazo: {rec.prazo}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <EmailCapture score={resultado.scoreGeral} classificacao={resultado.classificacao} />

        <div className="text-center mt-8">
          <button
            onClick={handleReiniciar}
            className="text-gray-400 hover:text-white transition text-sm underline"
          >
            Fazer diagnóstico novamente
          </button>
        </div>
      </div>
    );
  }

  const perguntaAtual = perguntas[etapa];
  const Icone = perguntaAtual.icone;
  const progresso = ((etapa) / perguntas.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Etapa {etapa + 1} de {perguntas.length}</span>
          <span>{Math.round(progresso)}% concluído</span>
        </div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direcao}>
        <motion.div
          key={etapa}
          custom={direcao}
          initial={{ opacity: 0, x: direcao > 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direcao > 0 ? -50 : 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple/30 to-accent-cyan/30 flex items-center justify-center">
                <Icone className="w-6 h-6 text-accent-cyan" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {perguntaAtual.pergunta}
              </h3>
            </div>

            <div className="space-y-3">
              {perguntaAtual.opcoes.map((opcao) => (
                <button
                  key={opcao.valor}
                  onClick={() => handleResposta(opcao.valor)}
                  className="w-full text-left p-4 rounded-xl bg-dark-800 border border-dark-600 hover:border-accent-cyan hover:bg-dark-700 transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200 group-hover:text-white transition">{opcao.label}</span>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-accent-cyan transition" />
                  </div>
                </button>
              ))}
            </div>

            {etapa > 0 && (
              <button
                onClick={handleVoltar}
                className="mt-6 flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

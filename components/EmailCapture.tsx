"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

interface EmailCaptureProps {
  score: number;
  classificacao: string;
}

export default function EmailCapture({ score, classificacao }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 text-center glow-cyan"
      >
        <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Email recebido!</h3>
        <p className="text-gray-300">
          Em breve você receberá seu <strong>Plano de Ação Completo</strong> no email.
        </p>
        <p className="text-gray-400 text-sm mt-4">
          Enquanto isso, que tal agendar uma call gratuita de 15 minutos?
        </p>
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-xl font-semibold text-white hover:opacity-90 transition"
        >
          Agendar Call Gratuita <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="glass p-8 glow-purple"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent-yellow" />
        <span className="text-accent-yellow font-semibold text-sm uppercase tracking-wider">
          Plano de Ação Completo
        </span>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">
        Sua loja está com nota <span style={{ color: score >= 61 ? "#22c55e" : "#eab308" }}>{classificacao}</span>
      </h3>
      <p className="text-gray-300 mb-6">
        Receba um relatório detalhado com <strong>plano de ação passo a passo</strong> para subir sua nota
        e aumentar suas vendas em até <strong>40%</strong> nos próximos 90 dias.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-xl font-bold text-white text-lg hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Enviando..." : <>Quero Meu Plano de Ação <ArrowRight className="w-5 h-5" /></>}
        </button>
      </form>

      <p className="text-gray-500 text-xs text-center mt-4">
        Gratuito e sem spam. Você pode cancelar a qualquer momento.
      </p>
    </motion.div>
  );
}

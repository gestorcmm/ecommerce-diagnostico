"use client";

import { motion } from "framer-motion";
import { BarChart3, Shield, Zap, Clock, ArrowDown, CheckCircle2 } from "lucide-react";
import DiagnosticoForm from "@/components/DiagnosticoForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Diagnóstico gratuito em 60 segundos
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Descubra a <span className="text-gradient">nota</span> do seu
              <br />
              e-commerce
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Avalie a saúde da sua loja virtual em <strong>4 áreas críticas</strong> e receba
              um plano de ação personalizado para aumentar suas vendas.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-green" /> 100% Gratuito
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-green" /> Sem cadastro obrigatório
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-green" /> Resultado imediato
              </span>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 mb-12 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">2.400+</div>
                <div className="text-xs md:text-sm text-gray-400">Lojas avaliadas</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-accent-cyan">+37%</div>
                <div className="text-xs md:text-sm text-gray-400">Média de crescimento</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-accent-purple">4.9/5</div>
                <div className="text-xs md:text-sm text-gray-400">Avaliação dos usuários</div>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-gray-500 text-sm mb-2">Comece seu diagnóstico abaixo</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="w-5 h-5 text-gray-500 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Diagnóstico Section */}
      <section className="py-8 pb-20">
        <DiagnosticoForm />
      </section>

      {/* Como funciona */}
      <section className="py-20 bg-dark-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Como funciona o diagnóstico
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Nossa metodologia avalia os 4 pilares fundamentais de qualquer e-commerce de sucesso.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icone: BarChart3,
                titulo: "Tráfego",
                desc: "Volume de visitantes, fontes de aquisição e custo por visita.",
                cor: "#a855f7",
              },
              {
                icone: Zap,
                titulo: "Conversão",
                desc: "Taxa de conversão, ticket médio e taxa de abandono de carrinho.",
                cor: "#00d4ff",
              },
              {
                icone: Shield,
                titulo: "Retenção",
                desc: "Taxa de recompra, LTV e satisfação do cliente.",
                cor: "#22c55e",
              },
              {
                icone: Clock,
                titulo: "Operação",
                desc: "Tempo de entrega, taxa de devolução e gestão de estoque.",
                cor: "#eab308",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 text-center hover:border-white/20 transition"
              >
                <div
                  className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: item.cor + "15" }}
                >
                  <item.icone className="w-7 h-7" style={{ color: item.cor }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.titulo}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-t from-dark-800 to-transparent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para descobrir a nota da sua loja?
            </h2>
            <p className="text-gray-400 mb-8">
              Leva menos de 1 minuto e é totalmente gratuito.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-xl font-bold text-white text-lg hover:opacity-90 transition glow-cyan"
            >
              Fazer Diagnóstico Agora <Zap className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-dark-600">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 Diagnóstico E-commerce. Todos os direitos reservados.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-gray-300 transition">Política de Privacidade</a>
            <span className="mx-2">·</span>
            <a href="#" className="hover:text-gray-300 transition">Termos de Uso</a>
          </p>
        </div>
      </footer>
    </main>
  );
}

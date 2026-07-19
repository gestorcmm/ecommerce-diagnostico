export const metadata = {
  title: "Diagnóstico E-commerce — Descubra a nota da sua loja",
  description: "Avalie a saúde do seu e-commerce em 60 segundos. Receba uma pontuação personalizada e recomendações para aumentar suas vendas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}

# 🚀 Diagnóstico E-commerce — Landing Page

Landing page de diagnóstico para e-commerces com cálculo de score em tempo real,
design profissional e captura de leads.

## ✨ Funcionalidades

- **Diagnóstico em 8 etapas** com animações suaves
- **Cálculo de Score 0-100** em 4 categorias (Tráfego, Conversão, Retenção, Operação)
- **Gauge visual animado** com classificação automática
- **Top 3 recomendações** priorizadas por impacto
- **Captura de email** com CTA para consultoria
- **Design responsivo** (mobile-first)
- **Tema escuro** profissional

## 🛠️ Tecnologias

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion (animações)
- Lucide React (ícones)

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Abrir http://localhost:3000
```

## 📦 Build para produção

```bash
npm run build
```

O resultado estará na pasta `dist/` (configurado para static export).

## 🔗 Próximos passos

1. **Integrar com Supabase** para salvar leads no banco de dados
2. **Conectar com Resend** para enviar email automático de boas-vindas
3. **Adicionar Pixel do Meta** e Google Analytics para tracking
4. **Criar página de obrigado** após captura de email
5. **Integrar Calendly** para agendamento de calls

## 📄 Estrutura

```
app/
  page.tsx          # Landing page principal
  layout.tsx        # Layout raiz
  globals.css       # Estilos globais
components/
  DiagnosticoForm.tsx   # Formulário de diagnóstico + resultado
  ScoreGauge.tsx        # Gauge circular animado
  EmailCapture.tsx      # Captura de email com CTA
lib/
  scoreCalculator.ts    # Algoritmo de pontuação
  recomendacoes.ts      # Banco de recomendações
```

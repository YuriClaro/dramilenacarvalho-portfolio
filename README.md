# Dra. Milena Carvalho - Cirurgiã-Dentista

Site de portfólio odontológico em Next.js (App Router) com TypeScript e Tailwind, pronto para deploy na Vercel.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS 4
- TypeScript
- ESLint + Prettier
- Jest + Testing Library
- Husky + lint-staged

## Como rodar

Instale as dependências:

```bash
npm install
```

Ambiente de desenvolvimento:

```bash
npm run dev
```

Qualidade e build:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Estrutura

- `src/app/page.tsx` - monta as seções da página
- `src/app/layout.tsx` - fontes (Inter e Playfair via `next/font`) e metadata
- `src/app/globals.css` - estilos e tema
- `src/app/api/contact/route.ts` - API do formulário de contato
- `src/components/` - seções (hero, sobre, serviços, casos clínicos, contato, rodapé)
- `src/data/` - **todo o conteúdo editável** (nome, CRO, contatos, formação, experiência, serviços, casos)
- `src/images/` - fotos usadas no site
- `src/lib/contact.ts` - validação do formulário

## Trocando os dados reais

Textos, contatos e CRO ficam em `src/data/`. Edite apenas esses arquivos, sem mexer nos componentes:

- `site.ts` - nome, CRO, endereço, WhatsApp, e-mail, Instagram, formação e experiência
- `services.ts` - serviços
- `portfolio.ts` - casos clínicos (títulos e descrições ainda genéricos; adicione fotos em `src/images/`)

## Formulário de contato

A rota `POST /api/contact` valida os dados e tem proteção anti-spam (honeypot).

Sem configuração, a mensagem é apenas registrada no log do servidor. Para enviar e-mail de verdade, crie uma conta na [Resend](https://resend.com) e defina as variáveis (veja `.env.example`) em `.env.local` ou na Vercel (Project Settings > Environment Variables):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` (opcional; use um domínio verificado)

## Deploy na Vercel

1. Envie o repositório para o GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório. A Vercel detecta o Next.js sozinha.
3. (Opcional) Configure as variáveis do formulário e clique em Deploy.

## Husky / lint-staged

O pré-commit executa o lint-staged para formatar e rodar o lint nos arquivos alterados. Rode `npm run prepare` após instalar as dependências se os hooks não estiverem ativos.

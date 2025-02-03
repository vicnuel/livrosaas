# LivroSaaS - SaaS de Livros

<div align="center">

![License](https://img.shields.io/github/license/vicnuel/livrosaas)
![Next.js Version](https://img.shields.io/badge/next.js-15.1.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.2.1-blue)
![Stripe](https://img.shields.io/badge/Stripe-17.5.0-blue)

</div>

## 📚 Sobre o Projeto

LivroSaaS é uma aplicação web moderna desenvolvida com Next.js 15, oferecendo uma solução completa para gerenciamento de uma assinatura de livros online. O projeto inclui autenticação segura, integração com Stripe para pagamentos e outras funcionalidades SaaS (Software as a Service). O projeto utiliza tecnologias de ponta e segue as melhores práticas de desenvolvimento.

Design desenvolvido por [Condante](https://github.com/codante-io/mp-saas-next-auth-prisma-next)

### 🌟 Principais Características

- 🔐 Autenticação segura com NextAuth
- 💳 Integração com Stripe para pagamentos
- 🎨 Interface moderna com Tailwind CSS
- 🔄 Banco de dados com Prisma
- 🚀 Performance otimizada com Next.js 15
- 🌐 Suporte a TypeScript
- 🔒 Ambiente seguro com variáveis de ambiente

## 🛠️ Tecnologias Utilizadas

- [Next.js 15.1.4](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Stripe](https://stripe.com/)
- [NextAuth V5](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Como Executar

### Pré-requisitos

- Node.js
- pnpm
- Uma conta no Stripe (para funcionalidades de pagamento)

### Configuração do Ambiente

1. Clone o repositório:

```bash
git clone https://github.com/vicnuel/livrosaas.git
cd livrosaas
```

2. Instale as dependências:

```bash
pnpm install or npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Preencha as variáveis no arquivo `.env` com suas credenciais.

4. Inicie o banco de dados com Docker:

```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:

```bash
pnpm prisma generate
pnpm prisma db push
```

6. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🌐 Estrutura do Projeto

```
livrosaas/
├── app/                 # Páginas e rotas da aplicação
├── components/          # Componentes React reutilizáveis
├── lib/                 # Utilitários e configurações
├── prisma/             # Schema e migrações do banco de dados
├── public/             # Arquivos estáticos
└── infra/              # Configurações de infraestrutura
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

Contribuições são sempre bem-vindas! Por favor, leia o guia de contribuição antes de submeter alterações.

1. Faça o Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

Link do Projeto: [https://github.com/vicnuel/livrosaas](https://github.com/vicnuel/livrosaas)

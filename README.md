# Movies API

Projeto desenvolvido com [NestJS](https://nestjs.com/) para gerenciar e consultar informações de filmes.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node)

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Executando a aplicação

Para rodar o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

Ao iniciar, a aplicação executará automaticamente as **migrations** e inserirá os dados iniciais presentes em `src/seeds`.

## Estrutura de dados inicial

Os registros padrão (seeds) ficam no diretório:

```
src/seeds
```

Eles são carregados automaticamente quando a aplicação sobe.

## Testes

Para rodar os testes (unitários e de integração):

```bash
npm run test
```

## Scripts principais

- `start:dev` → Inicia o servidor em modo de desenvolvimento.
- `test` → Executa todos os testes.

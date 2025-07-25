
# Movies API

Projeto desenvolvido com [NestJS](https://nestjs.com/) para gerenciar e consultar informações de filmes.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node)

## Banco de Dados

O projeto utiliza **SQLite3** como banco de dados.  
Ao iniciar a aplicação, o arquivo do banco será criado automaticamente no diretório configurado pelo TypeORM.

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

## Endpoints principais

- `GET /api/movies/maxMinWinIntervalForProducers` → Retorna os produtores com maior e menor intervalo entre vitórias.

## Testes

Para rodar os testes (unitários e de integração):

```bash
npm run test
```

## Scripts principais

- `start:dev` → Inicia o servidor em modo de desenvolvimento.
- `test` → Executa todos os testes.

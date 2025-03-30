# Node.js API com PostgreSQL

## Descrição
Esta é uma API construída em Node.js que utiliza PostgreSQL como banco de dados. A aplicação permite autenticação de usuários (login, logout), CRUD de usuários, CRUD de artigos com possibilidade de comentários, e busca interativa através de tags.

## Estrutura do Projeto
- src/controllers: Controladores da API.
- src/models: Modelos de dados.
- src/routes: Definição das rotas da API.
- src/migrations: Scripts de criação de tabelas no banco de dados.
- src/seeders: Dados iniciais para popular o banco.
- docker-compose.yml: Configuração para execução com Docker.

## Executando o Projeto
### Pré-requisitos
- Docker e Docker Compose instalados.

### Passos
1. Clone o repositório:
```
git clone https://github.com/usuario/nodejs-api-postgres.git
cd nodejs-api-postgres
```
2. Execute o projeto com Docker Compose:
```
docker-compose up --build
```
3. Acesse a API em:
```
http://localhost:3000
```

### Endpoints Principais
- POST /login: Autenticação de usuário.
- POST /logout: Logout do usuário.
- CRUD de usuários: /users
- CRUD de artigos: /articles
- CRUD de comentários: /articles/:id/comments
- Busca por tags: /articles?tags=tag1,tag2

### Rodando as Migrations e Seeders
Para criar as tabelas e popular o banco, execute:
```
docker exec -it nodejs-api-postgres bash
node src/migrations/migrate.js
node src/seeders/seed.js
```

## Tecnologias
- Node.js
- Express
- PostgreSQL
- Docker

## Licença
MIT

# Adonis API delivery app

Essa é uma API para um aplicativo de delivery. Permite criar usuário e realizar pedidos de produtos que pertencem a uma categoria e possuem diversos tamanhos. o usuário pode ser Administrador ou Cliente.

Administrador tem acesso às rotas de administrador e pode realizar CRUD de categorias (pizzas, massas, bebidas...), produtos (calabresa, mussarela...), tamanhos (grande, média, pequena...), pedidos e imagens.

Cliente tem acesso às rotas de clientes, podendo visualizar categorias e produtos e criar pedidos, bem como visualizar seus próprios pedidos.

Com as rotas separadas, o applicativo, voltado para o cliente, consumirá as rotas de clientes e a aplicação web consumirá as rotas de administrador, como manda o projeto.

## Setup

Para instalar as dependencias, excecute o comando `npm install`.

Configure as variáveis ambientes no arquivo .env de acordo com o .env.example.

Para rodar a API, em desenvolvimento, excecute o comando `adonis serve --dev`

### Migrations

Para rodar as migrations e criar as tabelas, excecute o comando `adonis migration:run`

### Seed

Para alimentar as tabelas com alguns dados, excecute o comando `adonis seed`

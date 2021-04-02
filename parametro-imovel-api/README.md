# Parametro-imovel-api

Api responsável por trazer alguns valores de parametro para calculos. Todos obtidos de uma base que futuramente poderia ser modificável pelo admin.

## Metro quadrado

Possui endpoint que retorna o valor do metro quadrado.

## Instalação

Para instalar o projeto basta rodar o comando `npm install`.

## Execução

### Sem docker

Para executar localmente basta configurar o arquivo `.env` com os valores de base e executar o comando `npm start`.

### Docker compose

Para executar com docker compose, basta subir o arquivo `docker-compose.yaml`.

## Documentação

Swagger está disponível através do endpoint `/api-docs`.

## Testes

Rodar o comando `npm test`.

## CI/CD

Cada commit para o `main`, gera um novo build e deploy no github actions.

## Disponibilização online

Está disponível em: ${url_heroku}.

# Imovel-api

Api responsável pela parte de imóvel, utilizando em alguns momentos a api de parametro de imovel.

## Valor imóvel

Possui endpoint que retorna o cálculo do valor do imóvel com base no retorno do valor do metro quadrado retornado da api de parametro de imovel.

## Instalação

Para instalar o projeto basta rodar o comando `npm install`.

## Execução

### Sem docker

Para executar localmente basta configurar o arquivo `.env` com a url do serviço de `parametro-imovel-api` e executar o comando `npm start`.

### Docker

Para executar com docker basta buildar a imagem docker e executar.

## Documentação

Swagger está disponível através do endpoint `/api-docs`.

## Testes

Rodar o comando `npm test`.

## CI/CD

Cada commit para o `main`, gera um novo build e deploy no github actions.

## Disponibilização online

Está disponível em: [ingaia-imovel-api](https://ingaia-imovel-api.herokuapp.com).

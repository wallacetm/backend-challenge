# inGaia - Back-end Developer

- Desenvolver 2 APIs
    - API1 - Retorna o valor fixo do metro quadrado
    - API2 - Recebe quantidade de metros quadrados e calcula o valor do imóvel
## Requisitos

- Seu serviço deve ser acessível através de uma API REST

- Você deverá desenvolver 2 APIs

- Seu serviço deve validar o valor de entrada

- O quantidade de metros quadrados deve estar entre 10 e 10.000

- Apesar do valor do metro quadrado ser fixo, desenvolva como se esse valor tivesse vindo de um base de dados

- O valor do métro quadrado dever ser obtido chamando a API1

- Disponibilizar os serviços Online


## O que gostaríamos de ver nos microserviços
- Boas práticas de desenvolvimento
- Padrões de codificação 
- Execução utilizando docker
- Readme bem estruturado explicando a arquitetura e instruções para subir os microserviços
- Código no GitHub, demonstrando conhecimento em sua utilização
- Swagger
- Teste unitário e teste de integração
- CI/CD


## Detalhes

Preferencialmente gostaríamos de ver seu código na linguagem da descrição da vaga, porém você pode utilizar qualquer linguagem, ferramenta, framework ou biblioteca com as quais se sentir confortável ou julgar necessário.

Caso tenha quaisquer dúvidas sobre este teste, a qualquer momento, sinta-se à vontade para entrar em contato através do e-mail engineering-tests@ingaia.com.br

Suba seu código em um repositório do GitHub e, ao final, compartilhe com o usuário: engenhariaingaia

## Dicas importantes:

- Para deixar seu serviço disponível online, uma boa dica é o [Heroku](https://www.heroku.com/). Ele permite que você publique algumas aplicações gratuitamente.

- Não se esqueça de disponibilizar o link do repositório e o link da API online.

## Instruções do DEV:

Cada api tem seu README.md explicando algumas coisas sobre o projeto desenvolvido.

Para subir todas as duas apis, utilize o arquivo `docker-compose.yaml` da raiz do projeto, executando através do comando: `docker-compose -f "docker-compose.yaml" up -d --build`.

- parametro-imovel-api: http://localhost:3000/api-docs
- imovel-api: http://localhost:3001/api-docs
- adminer (Facilitador para checar informações de base): http://localhost:8080

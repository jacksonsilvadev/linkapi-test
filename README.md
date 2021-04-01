<h1 align="center">
     🚀️ <a href="https://www.linkapi.solutions/" target="_blank" alt="linkapi site"> LinkApi Test </a>
</h1>

<h3 align="center">
    Teste técnico de integração de plataformas
</h3>

## 💻 Sobre o projeto

A tarefa designada é criar uma aplicação que pegue todos os negócios ganhos na plataforma Pipedrive e Criasse um pedido
na Plataforma Bling com os dados recebidos do Pipedrive.

---

## ⚙️ Lista de Tarefas

- [x] Criar contas testes nas plataformas Pipedrive e Bling.
- [x] Criar uma integração entre as plataformas Pipedrive e Bling (A integração deve buscar as oportunidades com status
  igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).
- [x] Criar banco de dados mongo.
- [x] Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor
  total.
- [x] Criar endpoint para trazer os dados consolidados da collection do MongoDB.

## Como executar o projeto

### Pré-requisitos

Necessário [Node.js](https://nodejs.org/en/) > 13.14.0

#### 🎲 Rodando o projeto

```bash

# Clone este repositório
$ git clone git@github.com:jacksonsilvadev/linkapi-test.git

# Acesse a pasta do projeto no terminal/cmd
$ cd linkapi-test

# Instale as dependências
$ npm install

```

Crie um arquivo .env seguindo as instruções do .env.example

```dotenv
# Environment Variables
NODE_ENV=development
NODE_PORT=3000

#MongoDB
MONGODBURL=mongourl

#Bling
BLING_TOKEN=API_TOKEN_BLING

#Pipedrive
PIPEDRIVE_TOKEN=PIPEDRIVE_TOKEN

```

Depois de configurar suas variáveis de ambiente

```bash

# Rode o projeto com um
$ npm run dev

## Caso você queira buildar ele para deploy
$ npm run build
$ npm run start

```

<p align="center">
  <a href="https://www.postman.com/collections/31f1ccec4139cab381b2" target="_blank"><img src="https://run.pstmn.io/button.svg" alt="Run in Postman"></a>
</p>

---

## 🛠 Tecnologias

- **[Express](https://expressjs.com/)**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[Mongoose](https://mongoosejs.com/)**
- **[ts-node](https://github.com/TypeStrong/ts-node)**
- **[dotENV](https://github.com/motdotla/dotenv)**

---

## Entendendo o projeto

Para fazer o sistema de integração foi criado um cron job, ele é executado a cada 5 minutos, operação:

* Bate na API do Pipedrive, pega todos os WonDeals pelo filtro da api.
* Checa se alguma desses Deal ja não foram inseridas no Bling, informação dada devido à collection criada de timeline.
* Pegando todos valores que não foram inseridos ainda, ele Transforma o JSON para um XML.
* Enviando os dados para o Bling.
* Usando o retorno do Bling e a Deal recebida do Pipedrive eu uso para salvar o Timeline de itens na collection da
  aplicação.

*_Na aplicação do Pipedrive você inputa, vários tipos de moedas e no Bling não temos essa opção.(Não que eu tenha
achado)
Para resolver esse problema, eu fiz integração com uma - **[API free](https://www.currencyconverterapi.com/)** que me
retorna o valor da moeda de uma para outra, e através disso eu calculo para saber o valor em real e enviar esse valor
para o Bling._
*_Foi criado uma rota para inicialização do job manual, caso necessário._

Como descrito na lista de tarefas o endpoint para receber o valor dos pedidos processados acumulado por dia. (Foi o meu
entendimento)

* Então utilizei o conceito de aggregation no mongoose juntamento do $group
* Para resolver o problema do tempo na data, transformei ela em um formato somente da data com o operador $dateToString
* Utilizei o $sum no value, para que ele acumulasse o valor conforma o grupo das datas.
* Finalizei utilizando o $sort para ordernar por maior valor.

## Referências

$group: https://docs.mongodb.com/manual/reference/operator/aggregation/group/

$dateToString: https://docs.mongodb.com/manual/reference/operator/aggregation/dateToString/

Readme: https://github.com/tgmarinho/README-ecoleta/blob/master/README-sem-logo.md

---

## 🦸 Autor

<a href="https://github.com/jacksonsilvadev">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/43053055?s=400&u=b91c74fe434fb27cf846210fbc5702706da789d4&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Jackson Silva</b></sub></a> <a href="https://github.com/jacksonsilvadev" title="Rocketseat">🚀</a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Jackson-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jacksonsilvadev/)](https://www.linkedin.com/in/jacksonsilvadev/)
[![Gmail Badge](https://img.shields.io/badge/-jacksonsilvadev@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jacksonsilvadev@gmail.com)](mailto:jacksonsilvadev@gmail.com)
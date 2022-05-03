# API Optimizations (04-05-2022)

Com base no código desenvolvido na aula anterior. Nesta aula foram abordadas as seguintes técnicas para otimização da API existente:

1. Paginação, pesquisa, filtragem e ordenação
2. Unificação das respostas
3. Validações
4. Handling de erros

## Paginação, pesquisa, filtragem e ordenação

Anteriormente a esta aula, apenas apresentavamos um endpoint "dumb" para retornar uma lista com todos os dados relativos a um recurso. Como era o caso da rota GET /articles em que apenas retornava o resultado de um findAll (todos os artigos guardados na BD):

```js
async function getAll(req, res) {
  const articles = await ArticleModel.findAll({
    include: [UserModel],
  });
  res.json(articles);
}
```

Esta abordagem apesar de retornar todos os dados existentes na base de dados, apresenta múltiplas limitações:

- Na existência de muitos dados, o pedido torna-se lento e pesado para o cliente.

- Não existe a possibilidade de usar as funcionalidades de filtragem/pesquisa oferecidas e optimizadas pela base dados. Teríamos de realizar todas estas operações no cliente side.

- O processamento dos pedidos no lado do servidor, torna-se mais pesado e limita a capacidade da API responder a múltiplos utilizadores.

### Na prática

Apesar de não existir um padrão utilizado por todas as RESTful API's, grande parte das API's usam como padrão os chamados *query parameters* que podem existir no em qualquer URL, sendo tudo aquilo após o ? presente nos URL's.
Exemplo:

GET localhost/articles?**q=UA&sort_by=title&order_by=asc**

Estes parametros do URL, são processados pelo express e ficam disponiveis no objeto do request:

```js
const { q, sort_by, order_by } = req.query;

console.log(q) // "UA"
console.log(sort_by) // "title"
console.log(order_by) // "asc"
```

Com esta informação é possível depois fazer os diferentes tipos de pedidos à base de dados com filtros/ordenação/search ativos:

```js
const { q, sort_by = 'title', order_by = 'asc' } = req.query;

const { count, rows } = await Project.findAndCountAll({
  where: {
    title: {
      [Op.like]: `%${q}%`
    }
  },
  order: [[sort_by, order_by.toUpperCase()]]
});
```

### Paginação

Uma das técnicas utilizados típicamente em restful API's para retornar dados é a paginação do tipo offset. Este tipo de paginação permite-nos filtrar apenas x númbero de resultados de cada vez. E com o uso dos parametros do URL página (page) e limit permite-nos retornar apenas uma pequena quantidade de dados de cada vez:

1. GET localhost/articles?**page=0&limit=10** // primeiros 10 resultados

2. GET localhost/articles?**page=1&limit=10** // resultados a partir do 10º até ao 20º

3. GET localhost/articles?**page=2&limit=10** // resultados a partir do 20º até ao 30º

Exemplo em express:

```js
const { page = 0, limit = 10 } = req.query;
const offset = +page * +limit;

const articles = await ArticleModel.findAndCountAll({
    include: [UserModel],
    page,
    limit: +limit,
    offset,
  });
```

## Unificação de respostas

Anteriormente a esta aula, apenas retornavamos a informação que estava a ser retornada da base de dados exatamente dessa forma:

```json
[
    {
        "id": 1,
        "title": "Functional Programming",
        "summary": "the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives",
        "content": "...the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives. This chapter introduces some functional programming concepts and illustrates their use in computing scores. 10.1 Introduction to Functional Programming Lisp was one of...",
        "createdAt": "2022-05-03T22:34:29.000Z",
        "updatedAt": "2022-05-03T22:34:29.000Z"
    },
    {
        "id": 2,
        "title": "Climate justice and international development: policy and programming",
        "summary": "the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives",
        "content": "...the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives. This chapter introduces some functional programming concepts and illustrates their use in computing scores. 10.1 Introduction to Functional Programming Lisp was one of...",
        "createdAt": "2022-05-03T22:34:42.000Z",
        "updatedAt": "2022-05-03T22:34:42.000Z"
    },
]
```

Porém, muitas vezes existe um conjunto de pedidos que necessitam de retornar mensagens adicionais ou metadados (como informações relativas à paginação). Desde modo, é um bom príncipio ter as respostas uniformizadas com este conjunto de dados "extra":

```json
{
    "message": "OK",
    "data": [
        {
            "id": 1,
            "title": "Functional Programming",
            "summary": "the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives",
            "content": "...the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives. This chapter introduces some functional programming concepts and illustrates their use in computing scores. 10.1 Introduction to Functional Programming Lisp was one of...",
            "createdAt": "2022-05-03T22:34:29.000Z",
            "updatedAt": "2022-05-03T22:34:29.000Z",
            "UserId": null,
            "User": null
        },
        {
            "id": 2,
            "title": "Climate justice and international development: policy and programming",
            "summary": "the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives",
            "content": "...the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives. This chapter introduces some functional programming concepts and illustrates their use in computing scores. 10.1 Introduction to Functional Programming Lisp was one of...",
            "createdAt": "2022-05-03T22:34:42.000Z",
            "updatedAt": "2022-05-03T22:34:42.000Z",
            "UserId": null,
            "User": null
        },
        {
            "id": 3,
            "title": "Understanding Pakistan’s Deradicalization Programming",
            "summary": "the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives",
            "content": "...the sequential evaluation of commands and the modification of variables. One advantage of functional programming is that functional programs are often easier to reason about than non-functional alternatives. This chapter introduces some functional programming concepts and illustrates their use in computing scores. 10.1 Introduction to Functional Programming Lisp was one of...",
            "createdAt": "2022-05-03T22:34:52.000Z",
            "updatedAt": "2022-05-03T22:34:52.000Z",
            "UserId": null,
            "User": null
        }
    ],
    "meta": {
        "statusCode": 200,
        "error": false,
        "total": 35
    }
}
```

De forma a manter sempre este tipo de padrão, é comum a criação de um ficheiro com a construção base destas respostas:

```js
function success(data, meta = {}, message = "OK", statusCode = 200) {
  return {
    message,
    data,
    meta: {
      statusCode,
      error: false,
      ...meta,
    },
  };
}

function error(message, statusCode = 500, errors = []) {
  return {
    message,
    code: statusCode,
    meta: {
      statusCode,
      error: true,
      errors,
      ...meta,
    },
  };
}

module.exports = {
  success,
  error,
};
```

## Validação de inputs em métodos POST e PUT

Validação em API's significa geralmente validar aquilo que utilizador introduz antes de inserir algo na base de dados. Se a validação não for feita, corremos o risco de que o utilizador introduza valores errados na base de dados (ex: utilizar um "1234" como email).

**Validar apénas num formulário no cliente não é suficiente visto que a API pode ser chamada diretamente (ex: Postman).**

Deste modo, é um bom príncipio validar tudo aquilo que o utilizador introduz através dos métodos POST e PUT.

Exemplo com a utilização de express validator:

```bash
npm i express-validator
```

// routes/articles.js

```js
  const { body } = require("express-validator");

  router.post(
  "/",
  body("title").isString().isLength({
    min: 3,
    max: 22,
  }).isRequired(),
  ArticleController.create
);
```

```js
  const { validationResult } = require("express-validator");

  async function create(req, res) {
  const { title, summary, content } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const article = await ArticleModel.create({
      title,
      summary,
      content,
    });
    res.json(article);
  } catch (e) {
    console.log(e);
  }
}
```

## Error handling

Nesta aula os erros começaram a ser "apanhados" e apresentados de forma apropriada:

```js
async function getById(req, res) {
  const { id } = req.params;

  const articleData = await ArticleModel.findByPk(id, {
    include: [UserModel],
  });
  if (articleData) {
    res.json(articleData);
  } else {
    res.status(404).json(error("Article Found", 404));
  }
}
```

```js
  async function create(req, res) {
  throw new Error('DB Down');
  const { title, summary, content } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const article = await ArticleModel.create({
      title,
      summary,
      content,
    });
    res.json(article);
  } catch (e) {
    console.log(e);
  }
}
```


## Links úteis

- [Bons princípios](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)
- [Filtering, Sorting, and Pagination](https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/)
- [Express validator](https://express-validator.github.io/docs/)
- [Validators](https://github.com/validatorjs/validator.js)
- [Express error handling](https://expressjs.com/en/guide/error-handling.html)

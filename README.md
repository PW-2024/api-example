# ORM (Object-relational mapping)

Nesta aula os principais tópicos abordados foram:
    1. ORM
    2. Integração do Sequelize
    3. Queries no Sequelize
    4. Relações no Sequelize
    5. CRUD
    6. Alternativas de ORM's em NodeJS

## Integração de Sequelize

Sequelize é uma libraria ORM que trata de "converter" as funcionalidades de SQL para objetos de javascript com métodos (funções) que nos permitem executar as várias queries sem termos de escrever qualquer linha de SQL.

Conceitos chave:

Models(properties) -> User (firstName, lastName) = CREATE Table Users (firstName VARCHAR(55), ....)
Queries -> User.findAll() = SELECT * FROM Users;
Associations (Relações) -> User.hasMany(Articles)

### Instalção

```bash
    npm i sequelize
```

### Criação de um *Model* (Representação de uma tabela)

Mais info:

- [Models](https://sequelize.org/docs/v6/core-concepts/model-basics/)

```js
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(155),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    summary: DataTypes.TEXT,
  });

```

### Representação de relações - *Associations*

Mais info: [Relações](https://sequelize.org/docs/v6/core-concepts/assocs/)

#### One-to-One

```js
    Foo.hasOne(Bar);
    Bar.belongsTo(Foo);
```

#### One-to-Many

```js
    Team.hasMany(Player);
    Player.belongsTo(Team);
```

#### Many-to-Many

```js
    Article.belongsToMany(Category, { through: 'ArticleCategories' });
    Category.belongsToMany(Article, { through: 'ArticleCategories' });
```

### Queries em sequelize

Mais info:

- [Queries](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
- [Finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)

#### Find (exemplo)

```sql
    SELECT * FROM Users;
```

```js
    Users.findAll({
        attributes: ['firstName', 'lastNName']
    });
```

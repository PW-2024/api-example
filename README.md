# Conexão de MySQL à API

Nesta aula os principais tópicos abordados foram:
    1. Instalação de um servidor de SQL localmente
    2. Conexão do servidor na API em NodeJS
    4. Guardar dados na base de dados com NodeJS
    3. Compreensão do modelo MVC
    3. Criação de endpoits CRUD de utilizador e artigos

## Software

Durante os exemplos da aula foram utilizados os seguintes softwares:

    - [MySQL Server](https://dev.mysql.com/downloads/mysql/). Servidor de MySQL que vai ser instalado localmente. O método de autenticação na instalação deve ser definido como o legacy (password).
    - [MySQL Workbench](https://dev.mysql.com/downloads/workbench/): Interface para manipulação da base de dados.

## Conexão da BD no NodeJS

De modo a poder conectar a uma base de dados através do NodeJS e realizar queries, é necessário utilizar um driver que nos permita enviar as queries para a base de dados.
O [mysql2](https://github.com/sidorares/node-mysql2) torna isto possível de forma eficiente.

### Instalação

``
npm install mysql2
``

### MVC

[MVC Concept](https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/)

## Desafio indivídual

    - Criação de um schema com 3 tabelas
    - Realizar CRUD de dois dos recursos

## Desafio do sprint 2

Com base no Schema definido no sprint 1 (Schema de base de dados):

    - Criar o repositório do grupo no gitlab/github.  
    - Exportar/Importar o Schema da BD numa base de dados local.
    - Definir um conjunto de recursos (mínimo 2 controladores com CRUD) na API de modo a serem integrados na aplicação.
    - Criar os principais recursos numa pasta de grupo no postman.

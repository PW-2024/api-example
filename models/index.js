const Sequelize = require("sequelize");
const getUserModel = require("./user");
const getArticleModel = require("./article");
const getRoleModel = require("./role");
const getCategoryModel = require("./category");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {
  RoleModel: getRoleModel(sequelize, Sequelize),
  UserModel: getUserModel(sequelize, Sequelize),
  ArticleModel: getArticleModel(sequelize, Sequelize),
  CategoryModel: getCategoryModel(sequelize, Sequelize),
};

Object.keys(db).forEach((key) => {
  if (db[key]["associate"]) {
    db[key].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;

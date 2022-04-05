const getArticleModel = (sequelize, { DataTypes }) => {
  const ArticleModel = sequelize.define("Article", {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    summary: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  ArticleModel.associate = ({ UserModel, CategoryModel }) => {
    ArticleModel.belongsTo(UserModel);
    ArticleModel.belongsToMany(CategoryModel, { through: "ArticleCategories" });
  };

  return ArticleModel;
};

module.exports = getArticleModel;

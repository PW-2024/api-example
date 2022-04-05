const getCategoryModel = (sequelize, { DataTypes }) => {
  const CategoryModel = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  });

  CategoryModel.associate = (models) => {
    CategoryModel.belongsToMany(models.ArticleModel, { through: "ArticleCategories" });
  };

  return CategoryModel;
};

module.exports = getCategoryModel;

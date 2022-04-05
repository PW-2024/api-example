const getUserModel = (sequelize, { DataTypes }) => {
  const UserModel = sequelize.define("User", {
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

  UserModel.associate = (models) => {
    UserModel.belongsTo(models.RoleModel, {
      foreignKey: {
        defaultValue: 1,
        allowNull: false,
      },
    });
    UserModel.hasMany(models.ArticleModel);
  };
  return UserModel;
};

module.exports = getUserModel;

const getRoleModel = (sequelize, { DataTypes }) => {
  const RoleModel = sequelize.define("Role", {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
  });

  RoleModel.associate = (models) => {
    RoleModel.hasMany(models.UserModel);
  };

  return RoleModel;
};

module.exports = getRoleModel;

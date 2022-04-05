const { UserModel, RoleModel } = require("../models");

async function getById(req, res) {
  const { id } = req.params;

  const userData = await UserModel.findByPk(id, {
    include: [RoleModel],
    attributes: { exclude: ["RoleId"] },
  });
  if (userData) {
    res.json(userData);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
}

async function getAll(req, res) {
  const users = await UserModel.findAll({
    include: [RoleModel],
  });

  res.json(users);
}

async function create(req, res) {
  const { firstName, lastName, email, summary } = req.body;

  const [user, created] = await User.findOrCreate({
    where: { firstName, lastName, email, summary },
    include: [RoleModel],
    attributes: { exclude: ["RoleId"] },
  });

  if (created) {
    res.json(user);
  } else {
    res.status(409).json({
      message: "User already exists",
    });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { firstName, lastName, summary } = req.body;

  const userData = await User.findByPk(id, {
    include: [RoleModel],
    attributes: { exclude: ["RoleId"] },
  });

  if (firstName) userData.firstName = firstName;
  if (lastName) userData.lastName = lastName;
  if (summary) userData.summary = summary;

  await userData.save();

  res.status(200).json(userData);
}

async function destroy(req, res) {
  const { id } = req.params;

  const userData = await User.findByPk(id, {
    include: [RoleModel],
    attributes: { exclude: ["RoleId"] },
  });

  if (!userData) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  await User.destroy({
    where: {
      id,
    },
  });
  return res.send(userData);
}

const UserController = {
  getById,
  getAll,
  create,
  update,
  destroy,
};

module.exports = UserController;

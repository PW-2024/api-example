const express = require("express");
require("dotenv").config();
const { error } = require("./utils/apiResponse");
const { sequelize, RoleModel, UserModel } = require("./models");

const Routes = require("./routes");

const port = process.env.PORT || 3000;

const app = express();

// Começar a processar o corpo dos requests
app.use(express.json());

app.use("/users", Routes.UserRoutes);
app.use("/articles", Routes.ArticleRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .send(error(err.message, err.statusCode || 500, err.errors));
});

const eraseDatabaseOnSync = true;

sequelize.sync({ sync: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createRoles();
    await createDefaultUsers();
  }

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

async function createRoles() {
  await RoleModel.findOrCreate({
    where: {
      id: 1,
      name: "regular",
    },
  });
  await RoleModel.findOrCreate({
    where: {
      id: 2,
      name: "admin",
    },
  });
}

async function createDefaultUsers() {
  await UserModel.findOrCreate({
    where: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "johnDoe@gmail.com",
      RoleId: 2,
    },
  });
}

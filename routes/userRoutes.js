const express = require("express");
const User = require("../models/user");

const router = express.Router();

// dados de um recurso
router.get("/users", (req, res) => {
  User.findAll()
    .then((users) => res.json(users[0]))
    .catch((err) =>
      res.status(500).json({
        err: "error while fetching the data",
      })
    );
});

// ir buscar um recurso com um determinado id
router.get("/users/:id", (req, res) => {
  console.log(req.params);

  // TODO
});

// publicar um novo recurso
router.post("/users", (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, summary } = req.body;

  User.create(firstName, lastName, email, summary)
    .then((data) => {
      // TODO: findById
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(500).json({
        err: err.sqlMessage,
      })
    );
});

// atualizar um recurso
router.put("/users/:id", (req, res) => {
  // url params
  const { id } = req.params;
  // informação do body
  // TODO
});

router.delete("/users/:id", (req, res) => {
  // url params
  const { id } = req.params;
  // TODO
});

module.exports = router;

const express = require("express");
const router = express.Router();

const articles = [
  {
    id: 1,
    name: "article 1",
  },
];

router.get("/articles", (req, res) => {
  res.json(articles);
});

module.exports = router;

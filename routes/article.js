const express = require("express");
const { ArticleController } = require("../controllers");

const router = express.Router();

router.get("/", ArticleController.getAll);
router.get("/:id", ArticleController.getById);
router.post("/", ArticleController.create);
router.put("/:id", ArticleController.update);
router.delete("/:id", ArticleController.destroy);

module.exports = router;

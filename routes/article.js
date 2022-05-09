const express = require("express");
const { ArticleController } = require("../controllers");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", ArticleController.getAll);
router.get("/:id", ArticleController.getById);
router.post(
  "/",
  body("title").notEmpty().withMessage("title cannot be empty"),
  body("summary").isAlphanumeric().notEmpty(),
  ArticleController.create
);
router.put("/:id", ArticleController.update);
router.delete("/:id", ArticleController.destroy);

module.exports = router;

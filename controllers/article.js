const { validationResult } = require("express-validator");

const { ArticleModel, UserModel } = require("../models");
const { success } = require("../utils/apiResponse");
const { NotFoundError, ValidationError } = require("../utils/errors");
const { Op } = require("sequelize");

async function getById(req, res) {
  const { id } = req.params;

  const articleData = await ArticleModel.findByPk(id, {
    include: [UserModel],
  });

  if (articleData) {
    res.json(articleData);
  } else {
    res.status(404).json({
      message: "Article not found",
    });
  }
}

async function getAll(req, res) {
  console.log(req.query);

  const {
    q,
    sort_by = "title",
    order_by = "asc",
    page = 0,
    limit = 10,
  } = req.query;

  const offset = +page * +limit;

  // page = 0, limit = 10 = 0
  // page = 1, limit = 10 = 10
  // page = 2, limit = 10 = 20

  const { count, rows } = await ArticleModel.findAndCountAll({
    include: [UserModel],
    order: [[sort_by, order_by]],
    offset,
    limit: limit,
    where: {
      title: {
        [Op.like]: `%${q}%`,
      },
    },
  });

  res.json(success(rows, { total: count }));
}

async function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ValidationError(errors.errors);
  }

  const { title, summary, content } = req.body;

  const article = await ArticleModel.create({ title, summary, content });

  res.json(success(article));
}

async function update(req, res) {
  const { id } = req.params;
  const { title, summary, content } = req.body;

  const articleData = await User.findByPk(id);

  if (title) articleData.title = title;
  if (summary) articleData.summary = summary;
  if (content) articleData.content = content;

  await articleData.save();

  res.status(200).json(articleData);
}

async function destroy(req, res) {
  const { id } = req.params;

  const articleData = await ArticleModel.findByPk(id);

  if (!articleData) {
    throw NotFoundError("Article not found");
  }

  await User.destroy({
    where: {
      id,
    },
  });

  return res.send(articleData);
}

const ArticleController = {
  getById,
  getAll,
  create,
  update,
  destroy,
};

module.exports = ArticleController;

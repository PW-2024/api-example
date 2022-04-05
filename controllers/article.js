const { ArticleModel, UserModel } = require("../models");

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
  const articles = await ArticleModel.findAll({
    include: [UserModel],
  });
  res.json(articles);
}

async function create(req, res) {
  const { title, summary, content } = req.body;

  const [article, created] = await ArticleModel.findOrCreate({
    where: { title, summary, content },
  });

  if (created) {
    res.json(article);
  } else {
    res.status(409).json({
      message: "Article already exists",
    });
  }
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
    return res.status(404).send({
      error: "Article not found",
    });
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

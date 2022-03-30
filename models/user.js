const db = require("../util/database");

async function findAll() {
  return db.query("SELECT * FROM users");
}

function findById(id) {
  return db.query("SELECT * FROM users WHERE users.id = ?", [id]);
}

function create(firstName, lastName, email, summary, role = 1) {
  return db.query(
    "INSERT INTO users (firstName, lastName, email, summary, Roles_id) VALUES (?, ?, ?, ?, ?)",
    [firstName, lastName, email, summary, role]
  );
}

function update(id, firstName, lastName, email, summary, role = 1) {
  // TODO: update query
}

function remove() {
  // TODO: remove query
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};

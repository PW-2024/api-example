const express = require("express");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const port = process.env.PORT || 3000;

const app = express();

// Começar a processar o corpo dos requests
app.use(express.json());

app.use(userRoutes);
app.use(articleRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log("server running on port: ", port));

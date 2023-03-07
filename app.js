require("dotenv").config();

const express = require("express");
const {notFound} = require("./middleware/not-found");
const app = express();
const port = process.env.PORT || 3000;

// const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>store API</h1><a href="/api/v1/products" >Products</a>`);
});

app.use(notFound);
// app.use(errorHandler);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {}
};

start();

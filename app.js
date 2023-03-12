require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { notFound } = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./db/connect");
const productsRouter = require("./routes/products");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>store API</h1><a href="/api/v1/products" >Products</a>`);
});
app.use("/api/v1/products", productsRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI_STORE);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

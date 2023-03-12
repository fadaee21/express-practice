require("dotenv").config(); // load.env variables
const { connectDB } = require("./db/connect"); // connect to db
const Product = require("./models/products"); // import the product model Schema
const jsonProduct = require("./data/products.json"); // import the products.json file
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI_STORE);
    await Product.deleteMany(); // delete all products
    await Product.insertMany(jsonProduct); // insert all products
    console.log("Products added to database");
    process.exit(0); // exit the program successfully
  } catch (error) {
    console.log(error);
    process.exit(1); //exit the program unsuccessfully
  }
};
start();

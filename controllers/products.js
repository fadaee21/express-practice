const Products = require("../models/products");
const getNumericFilters = async (req, res) => {
  const { numericFilters } = req.query;
  const queryObject = {};
  console.log(numericFilters);
  const operatorMap = {
    "=": "$eq",
    "<>": "$ne",
    "<": "$lt",
    "<=": "$lte",
    ">": "$gt",
    ">=": "$gte",
  };
  const regEx = /\b(<|>|>=|<=|=)\b/g;
  let filters = numericFilters.replace(
    regEx,
    (match) => `-${operatorMap[match]}-`
  );
  console.log(filters);
  const options = ["price", "rating"];
  filters.split(",").forEach((item) => {
    const [field, operator, value] = item.split("-");
    console.log(field, operator, value);
    if (options.includes(field)) {
      queryObject[field] = { [operator]: +value };
    }
  });
  console.log(queryObject);
  const products = await Products.find(queryObject);
  res.status(200).json({
    nbHits: products.length,
    products,
  });
};
const getAllProducts = async (req, res) => {
  const products = await Products.find({}).select("name price");
  res.status(200).json({
    nbHits: products.length,
    products,
  });
};
const getPaginationProducts = async (req, res) => {
  const { limit, page } = req.query;
  const products = await Products.find({})
    .limit(limit)
    .skip(limit * page);
  res.status(200).json({
    nbHits: products.length,
    products,
  });
};
const getSpecificProduct = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  const products = await Products.find(queryObject);

  console.log(queryObject);

  res.status(200).json({
    nbHits: products.length,
    products,
  });
};

module.exports = {
  getSpecificProduct,
  getNumericFilters,
  getAllProducts,
  getPaginationProducts,
};

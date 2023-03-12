const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  getNumericFilters,
  getSpecificProduct,
  getPaginationProducts,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/paginate").get(getPaginationProducts);
router.route("/search").get(getSpecificProduct);
router.route("/test").get(getNumericFilters);

module.exports = router;

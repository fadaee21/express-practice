const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  create,
  editById,
  deleteById,
  editByIdPut,
} = require("../controllers/tasks");

router.route("/api/v1/tasks").get(getAll).post(create);
router
  .route("/api/v1/tasks/:id")
  .get(getById)
  .patch(editById)
  .delete(deleteById)
  .put(editByIdPut);

module.exports = router;

const Task = require("../db/models/task");
const { CustomAPIError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");

const getAll = asyncWrapper(async (_req, res) => {
  const allTasks = await Task.find({});
  res.status(200).json(allTasks);
});

const create = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getById = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new CustomAPIError("Task not found", 404));
  res.status(200).json({ task });
});

const deleteById = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return next(new CustomAPIError("Task not found", 404));
  res.status(200).json({ message: "Task deleted" });
});

const editById = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //return new value if false will return value before update
    runValidators: true, // if the task is validate then update
  });
  if (!task) return next(new CustomAPIError("Task not found", 404));
  res.status(200).json({ message: "Task updated", task });
});
const editByIdPut = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //return new value if false will return value before update
      runValidators: true, // if the task is validate then update
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  create,
  getById,
  editById,
  deleteById,
  editByIdPut,
};

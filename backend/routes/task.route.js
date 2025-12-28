const express = require("express");
const router = express.Router();
const {authenticate} = require("../middlewares/auth.middleware");   
const {
  addNewTask,
  getMyTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/task.controller");
router.get("/", authenticate, getMyTasks);
router.post("/", authenticate, addNewTask);
router.put("/:id/status", authenticate, updateTaskStatus);
router.delete("/:id", authenticate, deleteTask);

module.exports = router;

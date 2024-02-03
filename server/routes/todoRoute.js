import express from "express";
const router = express.Router();

// controllers
import {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;

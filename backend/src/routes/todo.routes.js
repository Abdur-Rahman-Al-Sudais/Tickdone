import { Router } from "express";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  getAllTodos,
  toggleIsCompleted,
} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/create", createTodo);

router.get("/get-all-todos", getAllTodos);

router.patch("/toggle/:todoId", toggleIsCompleted);

router.route("/:todoId").get(getTodo).patch(updateTodo).delete(deleteTodo);

export default router;

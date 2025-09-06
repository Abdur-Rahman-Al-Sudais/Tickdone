import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "../models/todo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTodo = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  const userId = req.user._id;

  const createdTodo = await Todo.create({
    content,
    owner: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Todo created successfully", createdTodo));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    throw new ApiError(400, "Todo ID is not a valid ObjectId");
  }

  const userId = req.user._id;

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId, owner: userId },
    {
      content: content,
    },
    { new: true }
  );

  if (!updatedTodo) {
    throw new ApiError(404, "Todo not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Todo updated successfully", updatedTodo));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    throw new ApiError(400, "Todo ID is not a valid ObjectId");
  }

  const userId = req.user._id;

  const deletedTodo = await Todo.findOneAndDelete({
    _id: todoId,
    owner: userId,
  });

  if (!deletedTodo) {
    throw new ApiError(404, "Todo not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Todo deleted successfully", null));
});

const getTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    throw new ApiError(400, "Todo ID is not a valid ObjectId");
  }

  const userId = req.user._id;

  const findTodo = await Todo.findOne({ _id: todoId, owner: userId }).select(
    "+owner"
  );

  if (!findTodo) {
    throw new ApiError(404, "Todo not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Todo deleted successfully", findTodo));
});

const getAllTodos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const allTodos = await Todo.find({ owner: userId }).sort({
    createdAt: -1,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Todos retrieved successfully", allTodos));
});

const toggleIsCompleted = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    throw new ApiError(400, "Todo ID is not a valid ObjectId");
  }

  const userId = req.user._id;

  const findTodo = await Todo.findOne({ _id: todoId, owner: userId });
  findTodo.isCompleted = !findTodo.isCompleted;

  await findTodo.save({ validateBeforeSave: false });

  if (!findTodo) {
    throw new ApiError(404, "Todo not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Todo toggle status updated successfully", null)
    );
});

export {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  getAllTodos,
  toggleIsCompleted,
};

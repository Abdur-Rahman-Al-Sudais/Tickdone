import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  _id: string;
  content: string;
  isCompleted: boolean;
}
interface AuthState {
  todos: Todo[] | [];
  isLoading: boolean;
}

const initialState: AuthState = {
  todos: [],
  isLoading: true,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [action.payload, ...state.todos];
    },
    toggleIsCompleted: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map((todo: Todo) =>
        todo._id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    },
    updateTodo: (
      state,
      action: PayloadAction<{ _id: string; content: string }>
    ) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id
          ? { ...todo, content: action.payload.content }
          : todo
      );
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setTodos,
  updateTodo,
  setIsLoading,
  deleteTodo,
  addTodo,
  toggleIsCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;

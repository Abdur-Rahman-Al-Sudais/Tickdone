import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Pencil, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axiosPrivate from "@/api/axiosPrivate";
import { useAppDispatch } from "@/hooks/reduxHooks";

import {
  updateTodo as reduxUpdateTodo,
  deleteTodo as reduxDeleteTodo,
  toggleIsCompleted,
} from "../store/features/todoSlice";
import { Checkbox } from "./ui/checkbox";

const Todo = ({ data }: { data: any }) => {
  const [isEditible, setIsEditible] = useState(false);
  const [todoValue, setTodoValue] = useState(data.content);

  const todoInputRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const updateTodo = async () => {
    if (isEditible) {
      if (todoValue?.trim().length > 80) {
        toast.error("Todo must be no more than 80 characters");
        return;
      } else if (todoValue?.trim().length < 2) {
        toast.error("Todo must be atleast 2 characters");
        return;
      }
      try {
        await axiosPrivate.patch(`/todos/${data._id}`, {
          content: todoValue,
        });

        dispatch(reduxUpdateTodo({ content: todoValue, _id: data._id }));
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong while updating todo"
        );
      }
    } else {
      todoInputRef.current.focus();
    }
    setIsEditible(!isEditible);
  };

  const deleteTodo = async () => {
    try {
      await axiosPrivate.delete(`/todos/${data._id}`);

      dispatch(reduxDeleteTodo(data._id));
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while updating todo"
      );
    }
  };

  const toggleCompleted = async () => {
    try {
      await axiosPrivate.patch(`/todos/toggle/${data._id}`);

      dispatch(toggleIsCompleted(data._id));
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while toggling complete todo"
      );
    }
  };

  return (
    <div className="w-full flex items-start gap-3 bg-white dark:bg-neutral-900 rounded-lg px-4 py-3 shadow-md">
      {/* Checkbox */}
      <Checkbox
        checked={data.isCompleted}
        className="mt-1 cursor-pointer"
        onCheckedChange={toggleCompleted}
      />

      {/* Todo Text */}
      <input
        ref={todoInputRef}
        className={`flex-1 resize-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none border-none text-base sm:text-lg leading-relaxed overflow-hidden disabled:text-gray-500 dark:disabled:text-gray-400 ${
          data.isCompleted && "line-through"
        }`}
        readOnly={!isEditible}
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = `${el.scrollHeight}px`;
        }}
      />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          onClick={updateTodo}
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 dark:hover:bg-neutral-800 
                 text-gray-700 dark:text-white cursor-pointer rounded-full"
        >
          {isEditible ? (
            <Save className="w-4 h-4" />
          ) : (
            <Pencil className="w-4 h-4" />
          )}
        </Button>
        <Button
          onClick={deleteTodo}
          variant="ghost"
          size="icon"
          className="hover:bg-red-50 dark:hover:bg-neutral-800 
                 text-red-500 cursor-pointer rounded-full"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Todo;

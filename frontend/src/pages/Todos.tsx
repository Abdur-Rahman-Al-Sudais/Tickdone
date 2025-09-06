import axiosPrivate from "@/api/axiosPrivate";
import Todo from "@/components/Todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addTodo, setIsLoading, setTodos } from "@/store/features/todoSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { todoSchema } from "@/schemas/todoSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const Todos = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTodosType, setShowTodosType] = useState<
    "ALL" | "PENDING" | "COMPLETED"
  >("ALL");

  const { todos } = useAppSelector((state) => state.todo);

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof todoSchema>) => {
    const { content } = data;
    setIsSubmitting(true);
    try {
      const response = await axiosPrivate.post("/todos/create", { content });

      dispatch(addTodo(response.data.data));

      form.reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data.message ||
          "Something went wrong while adding todo"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      dispatch(setIsLoading(true));
      try {
        const response = await axiosPrivate.get("todos/get-all-todos");

        dispatch(setTodos(response.data.data));
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong while fetching todos"
        );
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    getTodos();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-neutral-950 flex flex-col items-center py-12 px-4">
      {/* Form */}
      <div className="w-full max-w-lg mb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 items-start"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Add a new todo..."
                      className="w-full h-12 rounded-xl border-gray-300 dark:border-neutral-700 shadow-sm focus:ring-2 focus:ring-indigo-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              className="h-12 px-6 rounded-xl shadow-sm cursor-pointer"
            >
              {isSubmitting ? "Adding..." : "Add"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-8">
        {["All", "Completed", "Pending"].map((btnType: any) => (
          <Button
          key={btnType}
            onClick={() => setShowTodosType(btnType.toUpperCase())}
            variant={
              showTodosType === btnType.toUpperCase() ? "default" : "outline"
            }
            className="rounded-lg cursor-pointer"
          >
            {btnType}
          </Button>
        ))}
      </div>

      {/* Todo List */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {(() => {
          let filteredTodos = todos;

          if (showTodosType === "PENDING") {
            filteredTodos = todos.filter((todo) => !todo.isCompleted);
          } else if (showTodosType === "COMPLETED") {
            filteredTodos = todos.filter((todo) => todo.isCompleted);
          }

          return filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => <Todo key={todo._id} data={todo} />)
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">
              No todos to display
            </p>
          );
        })()}
      </div>
    </div>
  );
};

export default Todos;

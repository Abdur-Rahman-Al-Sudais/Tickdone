import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "@/api/axios";
import { useState } from "react";
import type z from "zod";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/reduxHooks";
import {
  setIsAuthenticated,
  setIsLoading,
  setUser,
} from "@/store/features/authSlice";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const { identifier, password } = data;

    dispatch(setIsLoading(true));
    setIsSubmitting(true);
    try {
      const response = await axios.post("/users/login", {
        identifier,
        password,
      });

      dispatch(setIsAuthenticated(true));
      dispatch(setUser(response.data.data));

      navigate("/todos", {
        replace: true,
      });

      toast.success(response.data.message);
    } catch (error: any) {
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      toast.error(
        error?.response?.data.message || "Something went wrong during login"
      );
    } finally {
      setIsSubmitting(false);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Login to continue
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Identifier */}
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Username or Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show password toggle */}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={showPassword}
                onCheckedChange={() => setShowPassword(!showPassword)}
                id="showPassword"
              />
              <Label htmlFor="showPassword">Show passwords</Label>
            </div>

            {/* Submit button */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Submitting
                </>
              ) : (
                <>Submit</>
              )}
            </Button>
            {/* Forgot Password link */}
            <div className="flex justify-end">
              <Link
                to="/auth/password/forgot"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Register link */}
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-4">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/register"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;

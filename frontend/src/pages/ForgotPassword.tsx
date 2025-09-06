import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setIsAuthenticated, setUser } from "@/store/features/authSlice";
import axios from "@/api/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    const { email } = data;
    setIsSubmitting(true);
    try {
      const response = await axios.post("/users/password/forgot", { email });

      dispatch(setIsAuthenticated(true));
      dispatch(setUser(response.data.data));

      navigate("/auth/password/forgot/message", { replace: true });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while sending forgot password email"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
          Forgot Password
        </h1>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400 text-sm">
          Enter your email and we’ll send you instructions to reset your
          password.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We will send a reset password email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full h-11 rounded-xl shadow-sm cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Sending...
                </>
              ) : (
                "Send Email"
              )}
            </Button>

            {/* Footer */}
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
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

export default ForgotPassword;

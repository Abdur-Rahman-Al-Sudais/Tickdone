import { registerSchema } from "@/schemas/registerSchema";
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
  FormDescription,
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

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const { username, email, password } = data;

    setIsSubmitting(true);
    try {
      const response = await axios.post("/users/register", {
        username,
        email,
        password,
      });

      navigate(`/auth/verify/${response.data.data.username}`, {
        replace: true,
      });

      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong during registration"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center px-4 mt-6">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Register to create an Account
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    We will send a verification email
                  </FormDescription>
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
                      type={showPasswords ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type={showPasswords ? "text" : "password"}
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
                checked={showPasswords}
                onCheckedChange={() => setShowPasswords(!showPasswords)}
                id="showPasswords"
              />
              <Label htmlFor="showPasswords">Show passwords</Label>
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
            <p className="text-sm text-gray-600 dark:text-gray-300  flex justify-center items-center gap-1">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;

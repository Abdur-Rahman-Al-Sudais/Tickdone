import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "@/api/axios";
import { useState } from "react";
import type z from "zod";
import { useNavigate, useParams } from "react-router";

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
import { setIsAuthenticated, setUser } from "@/store/features/authSlice";

const ResetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    const { newPassword } = data;

    setIsSubmitting(true);
    try {
      const response = await axios.put(`/users/password/reset/${resetToken}`, {
        newPassword,
      });

      dispatch(setIsAuthenticated(true));
      dispatch(setUser(response.data.data));

      navigate(`/todos`, {
        replace: true,
      });

      toast.success(response.data.message);
    } catch (error: any) {
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while reseting the password"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center px-4 mt-6">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter new password"
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
                      placeholder="Enter confirm password"
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;

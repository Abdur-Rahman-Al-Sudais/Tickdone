"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verificationCodeSchema } from "@/schemas/verificationCodeSchema";
import axios from "@/api/axios";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setIsAuthenticated, setUser } from "@/store/features/authSlice";

export default function Verify() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof verificationCodeSchema>>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verificationCodeSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `/users/verify-user/${username}/${data.verificationCode}`
      );

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
          "Something went wrong during verification"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Verify Your Account
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Enter the 6-digit code we sent to your email.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="sr-only">Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                    Please enter the verification code sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full h-11 rounded-xl font-medium cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" /> Submitting
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
}

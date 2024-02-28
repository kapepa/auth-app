"use client"

import { useCallback, useMemo, useState, useTransition } from "react";
import { AuthCard } from "./auth-card";
import { BackButton } from "./back-button";
import { Routes } from "@/enums/routing.enum";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { NewPasswordSchema } from "@/schemas";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { reset } from "@/action/reset";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/action/new-password";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    }
  });

  const onSubmit = useCallback((values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) =>{
        setError(data.error);
        setSuccess(data.success);
      });
    });
  }, [token])

  const contentPart = useMemo(() => {
    return (
      <div className="flex flex-col gap-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
            </Button>
            <Button 
              type="submit"
              className="w-full bg-slate-900 text-rose-50"
              disabled={isPending}
            >Reset password</Button>
          </form>
        </Form>
      </div>
    )
  }, [form, onSubmit, isPending, error, success]);

  const footerPart = useMemo(() => {
    return (
      <BackButton 
        href={Routes.Login}
        label="Back to login"
      />
    )
  },[])

  return (
    <AuthCard 
      title="Auth"
      description="Enter a new password"
      content={contentPart}
      footer={footerPart}
    />
  )
};

export { NewPasswordForm };
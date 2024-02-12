"use client"

import { memo, useCallback, useMemo, useState, useTransition } from "react";
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
import { ResetSchema } from "@/schemas";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { login } from "@/action/login";
import { reset } from "@/action/reset";

const ResetForm = memo(() => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = useCallback((values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    console.log(values)
    startTransition(() => {
      reset(values).then((data) =>{
        setError(data.error);
        setSuccess(data.success);
      });
    });
  }, [])

  const contentPart = useMemo(() => {
    return (
      <div className="flex flex-col gap-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="email@example.com"
                      type="email"
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
            >Send reset email</Button>
          </form>
        </Form>
      </div>
    )
  }, [form.formState.errors, isPending, error, success])

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
      description="Forgot your password?"
      content={contentPart}
      footer={footerPart}
    />
  )
});

export {ResetForm };
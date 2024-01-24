"use client"

import { memo, useCallback, useMemo, useState, useTransition } from "react";
import { AuthCard } from "./auth-card";
import { Social } from "./social";
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
import { LoginSchema } from "@/schemas";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { login } from "@/action/login";

const LoginForm = memo(() => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = useCallback((values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) =>{
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
            <FormError message={error}/>
            <FormSuccess message={success} />
            <Button 
              type="submit"
              className="w-full bg-slate-900 text-rose-50"
              disabled={isPending}
            >Login</Button>
          </form>
        </Form>
        <Social/>
      </div>
    )
  }, [form.formState.errors, isPending, error, success])

  const footerPart = useMemo(() => {
    return (
      <BackButton 
        href={Routes.Registration}
        label="Don't have an account"
      />
    )
  },[])

  return (
    <AuthCard 
      title="Auth"
      description="Welcome back"
      content={contentPart}
      footer={footerPart}
    />
  )
});

export {LoginForm};
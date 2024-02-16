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
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginForm = memo(() => {
  const searchParam = useSearchParams();
  const urlError = searchParam.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
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

        if(!!data.error) {
          form.reset();
          setError(data.error);
        }

        if(!!data.success) {
          form.reset();
          setSuccess(data.success);
        }

        if(data.twoFactor) setShowTwoFactor(true);
      }).catch(() => {
        setError("Something went wrong!");
      });
    });
  }, [])

  const defaultLogin = useMemo(() => {
    return (
      <>
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
      </>
    )
  }, [form]);

  const twoFactorLogin = useMemo(() => {
    return (
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Two Factor Code</FormLabel>
            <FormControl>
              <Input 
                placeholder="123456"
                type="text"
                disabled={isPending}
                {...field} 
              />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
        )}
      />
    )
  }, []);

  const nameBtn = useMemo(() => {
    return showTwoFactor ? "Confirm" : "Login";
  }, [showTwoFactor])

  const contentPart = useMemo(() => {
    return (
      <div className="flex flex-col gap-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            { showTwoFactor ? twoFactorLogin : defaultLogin }
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link href={Routes.Reset}>Forgot password?</Link>
            </Button>
            <Button 
              type="submit"
              className="w-full bg-slate-900 text-rose-50"
              disabled={isPending}
            >{nameBtn}</Button>
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
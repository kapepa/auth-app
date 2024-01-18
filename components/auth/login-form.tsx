"use client"

import { memo, useCallback, useMemo } from "react";
import { AuthCard } from "./auth-card";
import { Social } from "./social";
import { BackButton } from "./back-button";
import { Routes } from "@/enums/routing.enum";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
import { FormError } from "../form-error";

const LoginForm = memo(() => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = useCallback((values: z.infer<typeof LoginSchema>) => {
    console.log(values)
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
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
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
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message="Something went wrong!"/>
            <Button 
              type="submit"
              className="w-full"
            >Login</Button>
          </form>
        </Form>
        <Social/>
      </div>
    )
  }, [])

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
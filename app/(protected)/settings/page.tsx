"use client"

import { settings } from "@/action/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"

const SettingsPage: NextPage = () => { 
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  
  const { update } = useSession();
  const user = useCurrentUser();
  
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnable: user?.isTwoFactorEnable || undefined,
    }
  })

  const onSubmit = useCallback((values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if(!!data.error) setError(data.error);
          if(!!data.success) setSuccess(data.success);
        })
        .catch((e) => setError("Something went wrong!"))
        .finally(() => update());
    });
  }, [form])

  return (
    <Card className="bg-white w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Settings
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4 p-r">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        placeholder="Your name"
                        disabled={isPending}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              { user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="email@example.com"
                            disabled={isPending}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This is your email.
                        </FormDescription>
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
                            type="password"
                            placeholder="******"
                            disabled={isPending}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This is your password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            placeholder="******"
                            disabled={isPending}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This is your new password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) }
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-10 bg-white">
                        <SelectItem value={UserRole.ADMIN}>{UserRole.ADMIN}</SelectItem>
                        <SelectItem value={UserRole.USER}>{UserRole.USER}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="isTwoFactorEnable"
                      render={({ field }) => (
                        <FormItem 
                          className="flex flex-row justify-between rounded-lg border p-3 shadow-sm"
                        >
                          <div className="space-y-0.5">
                            <FormLabel>Two factor authentication</FormLabel>
                            <FormDescription>Enablr two factor authentication for your account</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={isPending}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )
              }
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button
              type="submit"
              disabled={isPending}
            >Update</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};

export default SettingsPage;
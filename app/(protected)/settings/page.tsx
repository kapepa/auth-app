"use client"

import { settings } from "@/action/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: "",
    }
  })

  const onSubmit = useCallback((values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if(!!data.error) setError(data.error);
          if(!!data.success) setSuccess(data.success);
        })
        .finally(() => update());
    });
  }, [])

  return (
    <Card className="bg-white w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Settings
        </p>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onClick}
          disabled={isPending}
        >Update name</Button>
      </CardContent>
    </Card>
  )
};

export default SettingsPage;
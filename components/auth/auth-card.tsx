"use client"

import { FC, ReactNode, memo, useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AuthText } from "./auth-text";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  title?: string,
  description?: string,
  content?: ReactNode,
  footer?: ReactNode,
  className?: string
}

const AuthCard: FC<AuthCardProps> = memo((props) => {
  const { title, description, content, footer, className } = props;

  const HeaderPart = useMemo(() => {
    if(!title && !description) return;

    return (
      <CardHeader className="gap-2">
        {!!title && 
          <CardTitle children={<AuthText type="label" children={title} />} />}
        {!!description && 
          <CardDescription children={ <AuthText type="string" children={description} />}/>
        }
      </CardHeader>
    )
  },[title, description]);

  const ContentPart = useMemo(() => {
    if(!content) return;

    return (
      <CardContent children={content} />
    )
  }, [content]);

  const FooterPart = useMemo(() => {
    if(!footer) return;

    return (
      <CardFooter className="justify-center" children={footer} />
    )
  }, [footer])

  return (
    <Card className={cn("w-[30rem] shadow-md bg-white", className)}>
      {HeaderPart}
      {ContentPart}
      {FooterPart}
    </Card>
  )
});

export { AuthCard };
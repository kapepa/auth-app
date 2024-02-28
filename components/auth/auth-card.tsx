"use client"

import { FC, ReactNode,  useMemo } from "react";
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

const AuthCard: FC<AuthCardProps> = (props) => {
  const { title, description, content, footer, className } = props;

  const HeaderPart = useMemo(() => {
    if(!title && !description) return;

    return (
      <CardHeader className="gap-2">
        {!!title && 
          <CardTitle 
            className="text-center"
          >
            <AuthText type="label">{title}</AuthText>
          </CardTitle>
        }
        {!!description && 
          <CardDescription 
            className="text-center"
          >
            <AuthText type="string">{description}</AuthText>
          </CardDescription>
        }
      </CardHeader>
    )
  },[title, description]);

  const ContentPart = useMemo(() => {
    if(!content) return null;

    return (
      <CardContent>{content}</CardContent>
    )
  }, [content]);

  const FooterPart = useMemo(() => {
    if(!footer) return null;

    return (
      <CardFooter className="justify-center">{footer}</CardFooter>
    )
  }, [footer])

  return (
    <Card className={cn("w-[30rem] shadow-md bg-white", className)}>
      {HeaderPart}
      {ContentPart}
      {FooterPart}
    </Card>
  )
};

export { AuthCard };
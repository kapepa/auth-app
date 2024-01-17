"use client"

import { memo, useMemo } from "react";
import { AuthCard } from "./auth-card";
import { Social } from "./social";
import { BackButton } from "./back-button";

const LoginForm = memo(() => {

  const contentPart = useMemo(() => {
    return (
      <div>
        <div>
          Form
        </div>
        <Social/>
      </div>
    )
  }, [])

  const footerPart = useMemo(() => {
    return (
      <BackButton 
        href="/registration"
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
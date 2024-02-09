"use client"

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { AuthCard } from "./auth-card";
import { BackButton } from "./back-button";
import { Routes } from "@/enums/routing.enum";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/action/new-verification";
import { date } from "zod";
import { FormSuccess } from "../ui/form-success";
import { FormError } from "../ui/form-error";

const NewVerificationForm: FC = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if(!!error || !!success) return;
    if(!token) return setError("Missing token!");

    newVerification(token)
      .then((date) => { 
        setError(date.error);
        setSuccess(date.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  const contentPart = useMemo(() => {
    const beSuccess = !!success ? <FormSuccess message={success} /> : null;
    const beError = !!error ? <FormError message={error} /> : null;

    return (
      <div className="flex justify-center">
        { beSuccess ?? beError ?? <BeatLoader/> }
      </div>
    )
  }, [success, error]);

  const footerPart = useMemo(() => {
    return (
      <BackButton
        href={Routes.Login}
        label="Back to login"
      />
    )
  }, [])

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AuthCard
      title={"Auth"}
      description="Confirming your verification!"
      content={contentPart}
      footer={footerPart}
    />
  )
};

export { NewVerificationForm };
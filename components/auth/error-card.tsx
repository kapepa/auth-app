import { FC, useMemo } from "react";
import { BackButton } from "./back-button";
import { Routes } from "@/enums/routing.enum";
import { AuthCard } from "./auth-card";
import { FiAlertTriangle } from "react-icons/fi";

const ErrorCard: FC = () => {

  const contentPart = useMemo(() => {
    return (
      <div className="w-full flex justify-center items-center">
        <FiAlertTriangle className="text-red-500" fontSize={40} />
      </div>
    )
  }, []);
  return (
    <AuthCard
      className="w-[400] shadow-md"
      title="Oops! Something went wrong!"
      content={contentPart}
      footer={
        <BackButton 
          label="Back to login"
          href={Routes.Login}
        />
      }
    />
    )
}

export {ErrorCard};
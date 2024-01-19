import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { FC } from "react";

interface FormErrorProps {
  message?: string,
}

const FormError: FC<FormErrorProps> = (props) => {
  const { message } = props;

  if(!message) return null;

  return (
    <div className="p-3 rounded-md flex items-center gap-x-2 text-sm bg-red-300 text-red-600">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
};

export { FormError }
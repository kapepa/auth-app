import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FC } from "react";

interface FormSuccessProps {
  message?: string,
}

const FormSuccess: FC<FormSuccessProps> = (props) => {
  const { message } = props;

  if(!message) return null;

  return (
    <div className="p-3 rounded-md flex items-center gap-x-2 text-sm bg-green-300 text-green-600">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
};

export { FormSuccess }
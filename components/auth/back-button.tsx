import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Routes } from "@/enums/routing.enum";

interface BackButtonProps {
  href: Routes,
  label: string,
}

const BackButton: FC<BackButtonProps> = (props) => {
  const { href, label } = props;

  return (
    <Button variant="link">
      <Link 
        href={href}
      >{label}</Link>
    </Button>
  ) 
};

export { BackButton };
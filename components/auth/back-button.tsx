import { FC, memo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Routes } from "@/enums/routing.enum";

interface BackButtonProps {
  href: Routes,
  label: string,
}

const BackButton: FC<BackButtonProps> = memo((props) => {
  const { href, label } = props;

  return (
    <Button variant="link">
      <Link 
        href={href}
        children={label} 
      />
    </Button>
  ) 
});

export { BackButton };
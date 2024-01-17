import { FC, memo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string,
  label: string,
}

const BackButton: FC<BackButtonProps> = memo((props) => {
  const { href, label } = props;

  return (
    <Button>
      <Link 
        href={href}
        children={label} 
      />
    </Button>
  ) 
});

export { BackButton };
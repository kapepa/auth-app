import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { FC, ReactNode } from "react";

enum eType {
  label = "label",
  string = "string",
}

interface AuthTextProps {
  className?: string,
  children: ReactNode,
  type: keyof typeof eType,
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

const AuthText: FC<AuthTextProps> = (props) => {
  const {type, children, className} = props;

  if(type === eType.label) return (
    <span className={cn(font.className, "w-full text-center inline-block text-2xl", className)}>
      {children}
    </span>
  )

  if(type === eType.string) return (
    <span className={cn("text-sm text-center", className)}>
      {children}
    </span>
  )
};

export { AuthText }
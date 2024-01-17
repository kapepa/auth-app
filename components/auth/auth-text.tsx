import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { FC, ReactNode, memo } from "react";

enum eType {
  label = "label",
  string = "string",
}

interface AuthTextProps {
  children: ReactNode,
  type: keyof typeof eType,
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

const AuthText: FC<AuthTextProps> = memo((props) => {
  const {type, children} = props;

  if(type === eType.label) return (
    <span className={cn(font.className, "w-full text-center inline-block text-2xl")}>
      {children}
    </span>
  )

  if(type === eType.string) return (
    <span className="text-sm text-center">
      {children}
    </span>
  )
});

export { AuthText }
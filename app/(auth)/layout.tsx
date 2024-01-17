import { ReactNode } from "react";

const LayoutAuth = ({children}: {children: ReactNode}) => {
  return (
    <div className="h-full flex items-center justify-center bg-sky-500">
      {children}
    </div>
  )
}

export default LayoutAuth;
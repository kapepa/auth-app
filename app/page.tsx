import { AuthText } from "@/components/auth/auth-text"
import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-500">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle >
              <AuthText 
                type="label"
                className={cn("text-6xl font-semibold text-white drop-shadow-md text-center", font.className)}
              >
                Auth
              </AuthText> 
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AuthText 
              type="string" 
              className="text-white text-lg"
            >
              A simple authentication service
            </AuthText>
          </CardContent>
          <CardFooter className="flex-col">
            <LoginButton>
              <Button variant="secondary" size="lg">
                Sing in
              </Button>
            </LoginButton>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

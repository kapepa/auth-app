import { auth } from "./auth"

export default auth((req) => {
  const isLoffedIn = !! req.auth;
  // req.auth
  console.log("auth middleware")
  console.log(isLoffedIn)
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
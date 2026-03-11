import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      // Allow access to login and signup pages without authentication
      if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") {
        return !token // Only allow if NOT authenticated
      }

      // Require authentication for dashboard
      if (req.nextUrl.pathname === "/dashboard") {
        return !!token // Only allow if authenticated
      }

      // Allow public access to home page
      return true
    },
  },
})

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}

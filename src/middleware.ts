import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname

    // Manage route protection
    const isAuth = await getToken({ req })
    const isAuthPage = pathname.startsWith("/auth")
    const isFeaturePage = pathname.startsWith("/features")
    const sensitiveRoutes = ["/berapp"]
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    )
    if ("/" === pathname) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/berapp", req.url))
      }
    }
    if (isFeaturePage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/berapp", req.url))
      }
    }
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/berapp", req.url))
      }

      return NextResponse.next()
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
)

export const config = {
  matchter: [
    "/auth/:path*",
    "/berapp/:path*",
    "/berapp",
    "/",
    "/features/:path*",
  ],
}

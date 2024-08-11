import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { DEFAULT_REDIRECT, authRoutes } from "@/lib/constants";

const { auth } = NextAuth(authConfig);

//@ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

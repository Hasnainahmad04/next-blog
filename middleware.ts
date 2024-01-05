import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/signin" },
});

export const config = {
  matcher: ["/((?!home|api|_next/static|_next/image|favicon.ico).*)"],
};

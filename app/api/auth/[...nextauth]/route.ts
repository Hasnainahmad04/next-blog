import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@util/client";
import Github from "next-auth/providers/github";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findFirst({
        where: { email: session.user?.email! },
      });
      session.user = user;

      return session;
    },
  },
  pages: { signIn: "/signin" },
});

export { handler as GET, handler as POST };

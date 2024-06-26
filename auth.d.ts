import "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Or string
  }

  interface Session {
    user: User;
  }
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { NextAuth } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface JWT {
    sub?: string;
  }
}

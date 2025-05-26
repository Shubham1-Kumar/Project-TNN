import type { User as NextAuthUser, Session } from "next-auth";
import { NextAuthOptions } from "next-auth";
import db from "@/app/utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";
export const authOptions: NextAuthOptions = {
  // configure you providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "Email",
          placeholder: "example@email.com",
        },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          console.error("User not found");
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          existingUser.password
        );
        if (!isPasswordValid) {
          console.error("Invalid password");
          return null;
        }

        return {
          id: existingUser.id.toString(),
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret_can_be_any_thing_here",
  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", 
  },
};

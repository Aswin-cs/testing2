import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";
import { User } from "../models/User";
import { fallbackUsers } from "./fallbackStore";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password");
        }

        const normalizedEmail = credentials.email.toLowerCase().trim();

        // 1. Attempt MongoDB connection via Mongoose
        const conn = await connectToDatabase();
        if (conn) {
          try {
            const user = await User.findOne({ email: normalizedEmail });
            if (user && user.password) {
              const isMatch = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (!isMatch) {
                throw new Error("Invalid email or password");
              }
              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role || "citizen_observer",
              };
            }
          } catch (dbError) {
            console.warn("MongoDB query error, falling back:", dbError);
          }
        }

        // 2. Fallback memory store check
        const fbUser = fallbackUsers.find(
          (u) => u.email.toLowerCase() === normalizedEmail
        );
        if (fbUser) {
          const isMatch = await bcrypt.compare(
            credentials.password,
            fbUser.passwordHash
          );
          if (!isMatch) {
            throw new Error("Invalid email or password");
          }
          return {
            id: fbUser.id,
            name: fbUser.name,
            email: fbUser.email,
            role: fbUser.role,
          };
        }

        throw new Error("No account found with this email");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "citizen_observer";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id = token.id as string;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret:
    process.env.NEXTAUTH_SECRET ||
    "urban-air-quality-aerolytics-auth-secret-key-2026",
};

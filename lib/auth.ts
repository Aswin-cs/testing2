import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "./mongodb";
import { User } from "../models/User";

const providers: AuthOptions["providers"] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "not_configured_google_id",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "not_configured_google_secret",
    allowDangerousEmailAccountLinking: true,
  }),
];

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const conn = await connectToDatabase();
          if (conn && user.email) {
            const normalizedEmail = user.email.toLowerCase().trim();
            const existingUser = await User.findOne({ email: normalizedEmail });
            if (!existingUser) {
              await User.create({
                name: user.name || "Citizen Observer",
                email: normalizedEmail,
                image: user.image || undefined,
                provider: "google",
                role: "citizen_observer",
              });
            } else if (!existingUser.image && user.image) {
              existingUser.image = user.image;
              await existingUser.save();
            }
          }
        } catch (dbErr) {
          console.warn("Google OAuth user auto-sync error:", dbErr);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "citizen_observer";
        if (account?.provider) {
          token.provider = account.provider;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string; provider?: string }).id =
          token.id as string;
        (session.user as { id?: string; role?: string; provider?: string }).role =
          token.role as string;
        (session.user as { id?: string; role?: string; provider?: string }).provider =
          token.provider as string;
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

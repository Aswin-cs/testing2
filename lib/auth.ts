import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";
import { User } from "../models/User";
import { fallbackUsers } from "./fallbackStore";

const providers: AuthOptions["providers"] = [
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
];

// Add Google OAuth Provider if credentials are provided or configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
} else {
  // Graceful fallback dummy provider to allow NextAuth initialization without crashing
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "not_configured_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "not_configured_google_secret",
      allowDangerousEmailAccountLinking: true,
    })
  );
}

// Add GitHub OAuth Provider if credentials are provided or configured
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
} else {
  // Graceful fallback dummy provider to allow NextAuth initialization without crashing
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "not_configured_github_id",
      clientSecret: process.env.GITHUB_SECRET || "not_configured_github_secret",
      allowDangerousEmailAccountLinking: true,
    })
  );
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
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
                provider: account.provider,
                role: "citizen_observer",
              });
            } else if (!existingUser.image && user.image) {
              existingUser.image = user.image;
              await existingUser.save();
            }
          }
        } catch (dbErr) {
          console.warn("OAuth user auto-sync error:", dbErr);
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

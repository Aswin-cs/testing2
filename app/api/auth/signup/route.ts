import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { fallbackUsers } from "@/lib/fallbackStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Try Mongoose / MongoDB
    const conn = await connectToDatabase();
    if (conn) {
      try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
          return NextResponse.json(
            { message: "An account with this email already exists" },
            { status: 409 }
          );
        }

        const newUser = await User.create({
          name: name.trim(),
          email: normalizedEmail,
          password: hashedPassword,
          role: "citizen_observer",
        });

        // Also duplicate to fallback store
        fallbackUsers.push({
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          passwordHash: hashedPassword,
          role: "citizen_observer",
          createdAt: new Date(),
        });

        return NextResponse.json(
          {
            message: "User created successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
          },
          { status: 201 }
        );
      } catch (dbErr) {
        console.warn("MongoDB error during signup, using fallback:", dbErr);
      }
    }

    // 2. Fallback in-memory store
    const existing = fallbackUsers.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );
    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const fallbackId = "usr_" + Date.now().toString(36);
    const newFallbackUser = {
      id: fallbackId,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashedPassword,
      role: "citizen_observer",
      createdAt: new Date(),
    };
    fallbackUsers.push(newFallbackUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: fallbackId, name: name.trim(), email: normalizedEmail },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

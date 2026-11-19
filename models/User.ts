import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?: string;
  role?: string;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
    select: true,
  },
  image: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    default: "credentials",
  },
  role: {
    type: String,
    default: "citizen_observer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

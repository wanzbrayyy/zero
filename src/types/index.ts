import mongoose from "mongoose";

export interface ICollaboration extends mongoose.Document {
  project: mongoose.Schema.Types.ObjectId;
  applicant: mongoose.Schema.Types.ObjectId;
  role: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password?: string;
  role: "user" | "admin" | "creator";
  image?: string;
  bio?: string;
  skills?: string[];
  createdAt: Date;
  updatedAt: Date;
}

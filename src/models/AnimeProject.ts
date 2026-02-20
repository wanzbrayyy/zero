import mongoose, { Schema, Model } from "mongoose";
import { IAnimeProject } from "@/types";

const AnimeProjectSchema: Schema<IAnimeProject> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    genre: {
      type: [String],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["planning", "production", "completed", "on-hold"],
      default: "planning",
    },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        role: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

AnimeProjectSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

const AnimeProject: Model<IAnimeProject> =
  mongoose.models.AnimeProject || mongoose.model<IAnimeProject>("AnimeProject", AnimeProjectSchema);

export default AnimeProject;
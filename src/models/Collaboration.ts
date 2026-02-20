import mongoose, { Schema, Model } from "mongoose";
import { ICollaboration } from "@/types";

const CollaborationSchema: Schema<ICollaboration> = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "AnimeProject",
      required: true,
    },
    applicant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Collaboration: Model<ICollaboration> =
  mongoose.models.Collaboration ||
  mongoose.model<ICollaboration>("Collaboration", CollaborationSchema);

export default Collaboration;

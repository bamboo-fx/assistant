import mongoose, { Schema, Document } from "mongoose";
import { Domain } from "./Entry";

export interface IInsight extends Document {
  userId: mongoose.Types.ObjectId;
  domain: Domain | "all";
  type: "weekly" | "monthly" | "on-demand";
  content: string;
  createdAt: Date;
}

const InsightSchema = new Schema<IInsight>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  domain: {
    type: String,
    enum: ["gym", "business", "reading", "self-improvement", "all"],
    required: true,
  },
  type: { type: String, enum: ["weekly", "monthly", "on-demand"], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Insight || mongoose.model<IInsight>("Insight", InsightSchema);

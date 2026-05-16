import mongoose, { Schema, Document } from "mongoose";

export type Domain = "gym" | "business" | "reading" | "self-improvement";

export interface IEntry extends Document {
  userId: mongoose.Types.ObjectId;
  domain: Domain;
  role: "user" | "assistant";
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const EntrySchema = new Schema<IEntry>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  domain: {
    type: String,
    enum: ["gym", "business", "reading", "self-improvement"],
    required: true,
  },
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

EntrySchema.index({ userId: 1, domain: 1, createdAt: -1 });

export default mongoose.models.Entry || mongoose.model<IEntry>("Entry", EntrySchema);

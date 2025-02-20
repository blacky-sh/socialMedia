import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reportedPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    reason: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    collection: "messages"
  }
);

export default mongoose.model("Message", messageSchema);

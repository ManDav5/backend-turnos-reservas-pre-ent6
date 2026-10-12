import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    clientName: {
      type: String,
      required: true,
      trim: true
    },
    clientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    }
  },
  {
    timestamps: true,
    collection: "bookings"
  }
);

export default mongoose.model("Booking", bookingSchema);


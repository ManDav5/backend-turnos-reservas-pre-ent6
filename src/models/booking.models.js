import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    services: [
      {
        _id: false,
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1
        }
      }
    ],
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
    time: {
      type: String,
      required: true,
      trim: true
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



import Booking from "../models/booking.models.js";

export class BookingsDao {
  async getAll() {
    return await Booking.find().populate("service");
  }

  async getById(id) {
    return await Booking.findById(id).populate("service");
  }

  async create(bookingData) {
    return await Booking.create(bookingData);
  }

  async update(id, updateData) {
    return await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).populate("service");
  }

  async delete(id) {
    const deleted = await Booking.findByIdAndDelete(id);
    return Boolean(deleted);
  }
}

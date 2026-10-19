import * as bookingsService from '../services/bookings.service.js';

export const createBooking = async (req, res) => {
  try {
    const newBooking = await bookingsService.createBooking(req.body);
    return res.status(201).json({ status: 'success', payload: newBooking });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ status: 'error', message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { bid } = req.params;
    const booking = await bookingsService.getBookingById(bid);

    return res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    return res.status(error.statusCode || 404).json({ status: 'error', message: error.message });
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const { bid, sid } = req.params;
    const quantity = req.body?.quantity || 1;

    const result = await bookingsService.addServiceToBooking(bid, sid, quantity);

    return res.status(200).json({ status: 'success', payload: result });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ status: 'error', message: error.message });
  }
};



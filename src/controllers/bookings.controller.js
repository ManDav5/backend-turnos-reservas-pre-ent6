import * as bookingsService from '../services/bookings.service.js';

export const createBooking = async (req, res) => {
  try {
    const { clientName, clientEmail, date, time, status } = req.body;

    if (!clientName || !clientEmail || !date || !time) {
      return res.status(400).json({
        status: 'error',
        message: 'Nombre, email, fecha y hora son obligatorios'
      });
    }

    const newBooking = await bookingsService.createBooking({
      clientName,
      clientEmail,
      date,
      time,
      status
    });

    res.status(201).json({ status: 'success', payload: newBooking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { bid } = req.params;
    const booking = await bookingsService.getBookingById(bid);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: `Reserva con ID ${bid} no encontrada`
      });
    }

    res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const { bid, sid } = req.params;

    const result = await bookingsService.addServiceToBooking(bid, sid);

    if (!result) {
      return res.status(404).json({
        status: 'error',
        message: 'Reserva o servicio no encontrado'
      });
    }

    res.status(200).json({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

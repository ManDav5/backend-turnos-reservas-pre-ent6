import { BookingManager } from '../managers/BookingManager.js';
import { ServiceManager } from '../managers/ServiceManager.js';

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = async (req, res) => {
  try {
    const { clientName, clientEmail, date, time, status } = req.body;

    if (!clientName || !clientEmail || !date || !time) {
      return res.status(400).json({ status: 'error', message: 'Nombre, email, fecha y hora son obligatorios' });
    }

    const newBooking = await bookingManager.createBooking({
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
    const booking = await bookingManager.getBookingById(bid);

    if (!booking) {
      return res.status(404).json({ status: 'error', message: `Reserva con ID ${bid} no encontrada` });
    }

    res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const { bid, sid } = req.params;

    // Validamos primero que el servicio exista en catálogo
    const serviceExists = await serviceManager.getServiceById(sid);
    if (!serviceExists) {
      return res.status(404).json({ status: 'error', message: `El servicio con ID ${sid} no existe` });
    }

    const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);
    if (!updatedBooking) {
      return res.status(404).json({ status: 'error', message: `Reserva con ID ${bid} no encontrada` });
    }

    res.status(200).json({ status: 'success', payload: updatedBooking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

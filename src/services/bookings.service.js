import { BookingsRepository } from '../repositories/bookings.repository.js';
import { ServicesRepository } from '../repositories/services.repository.js';

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export const createBooking = async (bookingData) => {
  const { clientName, clientEmail, date, time } = bookingData;

  // Validación de campos obligatorios
  if (!clientName || !clientEmail || !date || !time) {
    const error = new Error('Nombre, email, fecha y hora son obligatorios');
    error.statusCode = 400;
    throw error;
  }

  return await bookingsRepository.create(bookingData);
};

export const getBookingById = async (id) => {
  const booking = await bookingsRepository.getById(id);
  
  if (!booking) {
    const error = new Error(`Reserva con ID ${id} no encontrada`);
    error.statusCode = 404;
    throw error;
  }

  return booking;
};

export const addServiceToBooking = async (bookingId, serviceId) => {
  const service = await servicesRepository.getById(serviceId);
  if (!service) {
    const error = new Error(`Servicio con ID ${serviceId} no encontrado`);
    error.statusCode = 404;
    throw error;
  }

  const booking = await bookingsRepository.getById(bookingId);
  if (!booking) {
    const error = new Error(`Reserva con ID ${bookingId} no encontrada`);
    error.statusCode = 404;
    throw error;
  }

  const existingServiceIndex = booking.services.findIndex((s) => s.service === serviceId);

  if (existingServiceIndex !== -1) {
    booking.services[existingServiceIndex].quantity += 1;
  } else {
    booking.services.push({
      service: serviceId,
      quantity: 1
    });
  }

  return await bookingsRepository.update(bookingId, booking);
};

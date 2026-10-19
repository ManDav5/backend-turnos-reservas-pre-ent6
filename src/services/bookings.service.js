import { BookingsRepository } from '../repositories/bookings.repository.js';
import { ServicesRepository } from '../repositories/services.repository.js';

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export const createBooking = async (bookingData) => {
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

export const addServiceToBooking = async (bookingId, serviceId, quantity = 1) => {
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

  const servicesList = booking.services ? [...booking.services] : [];

  const existingServiceIndex = servicesList.findIndex((s) => {
    const currentId = s.service?._id ? s.service._id.toString() : s.service?.toString();
    return currentId === serviceId.toString();
  });

  const parsedQty = Number(quantity) > 0 ? Number(quantity) : 1;

  if (existingServiceIndex !== -1) {
    servicesList[existingServiceIndex].quantity += parsedQty;
  } else {
    servicesList.push({
      service: serviceId,
      quantity: parsedQty
    });
  }

  const updatedServices = servicesList.map((item) => ({
    service: item.service?._id || item.service,
    quantity: item.quantity
  }));

  return await bookingsRepository.update(bookingId, { services: updatedServices });
};

export const getAllBookings = async () => {
  return await bookingsRepository.getAll();
};




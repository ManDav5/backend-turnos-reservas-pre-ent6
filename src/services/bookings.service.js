import { BookingsRepository } from '../repositories/bookings.repository.js';
import { ServicesRepository } from '../repositories/services.repository.js';

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export const createBooking = async (bookingData) => {
  return await bookingsRepository.create(bookingData);
};

export const getBookingById = async (id) => {
  return await bookingsRepository.getById(id);
};

export const addServiceToBooking = async (bookingId, serviceId) => {

  const service = await servicesRepository.getById(serviceId);
  if (!service) {
    return null;
  }

  const booking = await bookingsRepository.getById(bookingId);
  if (!booking) {
    return null;
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

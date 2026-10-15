import { getServices } from '../services/services.service.js';
import { getAllBookings } from '../services/bookings.service.js';

export const renderServicesView = async (req, res) => {
  try {
    const rawServices = await getServices();

    const services = rawServices.map(doc => (doc.toObject ? doc.toObject() : doc));

    res.render('services', {
      title: 'Catálogo de Servicios',
      services
    });
  } catch (error) {
    res.status(500).render('services', {
      title: 'Catálogo de Servicios',
      error: 'Error al cargar los servicios',
      services: []
    });
  }
};

export const renderAvailabilityView = async (req, res) => {
  try {
    const rawBookings = await getAllBookings();
    const bookings = rawBookings.map(doc => (doc.toObject ? doc.toObject() : doc));

    res.render('availability', {
      title: 'Disponibilidad y Turnos',
      bookings
    });
  } catch (error) {
    res.status(500).render('availability', {
      title: 'Disponibilidad y Turnos',
      error: 'Error al cargar las reservas',
      bookings: []
    });
  }
};


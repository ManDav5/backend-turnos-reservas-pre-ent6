import { ServicesRepository } from '../repositories/services.repository.js';

const servicesRepository = new ServicesRepository();

export const getServices = async ({ limit = 10, page = 1, sort, query } = {}) => {
  const filter = {};

  if (query) {
    if (query === 'true' || query === 'false') {
      filter.available = query === 'true';
    } else {
      filter.category = query;
    }
  }

  const options = {
    limit: Number(limit) || 10,
    page: Number(page) || 1,
    lean: true
  };

  if (sort) {
    if (sort === 'asc') options.sort = { price: 1 };
    if (sort === 'desc') options.sort = { price: -1 };
  }

  return await servicesRepository.paginate(filter, options);
};

export const getServiceById = async (id) => {
  const service = await servicesRepository.getById(id);
  if (!service) {
    const error = new Error(`Servicio con ID ${id} no encontrado`);
    error.statusCode = 404;
    throw error;
  }
  return service;
};

export const createService = async (serviceData) => {
  const { name, description, duration, price, category } = serviceData;

  if (!name || !description || duration === undefined || price === undefined || !category) {
    const error = new Error('Campos requeridos: name, description, duration, price, category');
    error.statusCode = 400;
    throw error;
  }

  return await servicesRepository.create(serviceData);
};

export const updateService = async (id, updateData) => {
  const updated = await servicesRepository.update(id, updateData);
  if (!updated) {
    const error = new Error(`Servicio con ID ${id} no encontrado para actualizar`);
    error.statusCode = 404;
    throw error;
  }
  return updated;
};

export const deleteService = async (id) => {
  const deleted = await servicesRepository.delete(id);
  if (!deleted) {
    const error = new Error(`Servicio con ID ${id} no encontrado para eliminar`);
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};



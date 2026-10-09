import { ServicesRepository } from '../repositories/services.repository.js';

const servicesRepository = new ServicesRepository();

export const getServices = async (limit) => {
  const services = await servicesRepository.getAll();

  if (limit) {
    const parsedLimit = Number(limit);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      const error = new Error('El parámetro limit debe ser un número positivo');
      error.statusCode = 400;
      throw error;
    }
    return services.slice(0, parsedLimit);
  }

  return services;
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

  // Validación de campos obligatorios
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


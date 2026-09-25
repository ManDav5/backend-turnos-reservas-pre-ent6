import { ServicesRepository } from '../repositories/services.repository.js';

const servicesRepository = new ServicesRepository();

export const getServices = async (limit) => {
  const services = await servicesRepository.getAll();

  if (limit) {
    const parsedLimit = Number(limit);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      throw new Error('El parámetro limit debe ser un número positivo');
    }
    return services.slice(0, parsedLimit);
  }

  return services;
};

export const getServiceById = async (id) => {
  return await servicesRepository.getById(id);
};

export const createService = async (serviceData) => {
  return await servicesRepository.create(serviceData);
};

export const updateService = async (id, updateData) => {
  return await servicesRepository.update(id, updateData);
};

export const deleteService = async (id) => {
  return await servicesRepository.delete(id);
};

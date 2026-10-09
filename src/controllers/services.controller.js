import * as servicesService from '../services/services.service.js';

export const getServices = async (req, res) => {
  try {
    const { limit } = req.query;
    const services = await servicesService.getServices(limit);
    return res.status(200).json({ status: 'success', payload: services });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { sid } = req.params;
    const service = await servicesService.getServiceById(sid);
    return res.status(200).json({ status: 'success', payload: service });
  } catch (error) {
    return res.status(error.statusCode || 404).json({ status: 'error', message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, duration, price, category, available = true } = req.body;

    const newService = await servicesService.createService({
      name,
      description,
      duration,
      price,
      category,
      available
    });

    return res.status(201).json({ status: 'success', payload: newService });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ status: 'error', message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { sid } = req.params;
    const updateData = req.body;

    const updated = await servicesService.updateService(sid, updateData);
    return res.status(200).json({ status: 'success', payload: updated });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ status: 'error', message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { sid } = req.params;
    const deleted = await servicesService.deleteService(sid);

    return res.status(200).json({
      status: 'success',
      message: `Servicio con ID ${sid} eliminado correctamente`,
      payload: deleted
    });
  } catch (error) {
    return res.status(error.statusCode || 404).json({ status: 'error', message: error.message });
  }
};



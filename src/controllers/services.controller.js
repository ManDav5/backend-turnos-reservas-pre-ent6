import * as servicesService from '../services/services.service.js';

export const getServices = async (req, res) => {
  try {
    const { limit } = req.query;
    const services = await servicesService.getServices(limit);
    res.status(200).json({ status: 'success', payload: services });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { sid } = req.params;
    const service = await servicesService.getServiceById(sid);

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: `Servicio con ID ${sid} no encontrado`
      });
    }

    res.status(200).json({ status: 'success', payload: service });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, duration, price, category, available = true } = req.body;

    if (!name || !description || duration === undefined || price === undefined || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Campos requeridos: name, description, duration, price, category'
      });
    }

    const newService = await servicesService.createService({
      name,
      description,
      duration,
      price,
      category,
      available
    });

    res.status(201).json({ status: 'success', payload: newService });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { sid } = req.params;
    const updateData = req.body;

    const updated = await servicesService.updateService(sid, updateData);

    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: `Servicio con ID ${sid} no encontrado para actualizar`
      });
    }

    res.status(200).json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { sid } = req.params;
    const deleted = await servicesService.deleteService(sid);

    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: `Servicio con ID ${sid} no encontrado para eliminar`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Servicio con ID ${sid} eliminado correctamente`
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};


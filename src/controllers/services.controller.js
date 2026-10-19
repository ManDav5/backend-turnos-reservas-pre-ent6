import * as servicesService from '../services/services.service.js';

export const getServices = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const result = await servicesService.getServices({
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
      sort,
      query
    });

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    const makeLink = (targetPage) => {
      const params = new URLSearchParams(req.query);
      params.set('page', targetPage);
      return `${baseUrl}?${params.toString()}`;
    };

    return res.status(200).json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? makeLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? makeLink(result.nextPage) : null
    });
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
    const newService = await servicesService.createService(req.body);
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




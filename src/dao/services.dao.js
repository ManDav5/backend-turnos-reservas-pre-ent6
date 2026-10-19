import Service from "../models/service.models.js";

export class ServicesDao {
  async paginate(filter, options) {
    return await Service.paginate(filter, options);
  }

  async getAll() {
    return await Service.find();
  }

  async getById(id) {
    return await Service.findById(id);
  }

  async create(serviceData) {
    return await Service.create(serviceData);
  }

  async update(id, updateData) {
    return await Service.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async delete(id) {
    const deleted = await Service.findByIdAndDelete(id);
    return Boolean(deleted);
  }
}



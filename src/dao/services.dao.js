import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export class ServicesDao {
  constructor() {
    this.path = path.resolve('src/data/services.json');
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(this.path, JSON.stringify([], null, 2), 'utf-8');
        return [];
      }
      throw error;
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getAll() {
    return await this._readFile();
  }

  async getById(id) {
    const services = await this._readFile();
    return services.find((s) => s.id === id) || null;
  }

  async create(serviceData) {
    const services = await this._readFile();

    const newService = {
      id: crypto.randomUUID(),
      name: serviceData.name,
      description: serviceData.description,
      duration: serviceData.duration,
      price: serviceData.price,
      category: serviceData.category,
      available: serviceData.available !== undefined ? serviceData.available : true
    };

    services.push(newService);
    await this._writeFile(services);
    return newService;
  }

  async update(id, updateData) {
    const services = await this._readFile();
    const index = services.findIndex((s) => s.id === id);

    if (index === -1) {
      return null;
    }

    services[index] = {
      ...services[index],
      ...updateData,
      id
    };

    await this._writeFile(services);
    return services[index];
  }

  async delete(id) {
    const services = await this._readFile();
    const index = services.findIndex((s) => s.id === id);

    if (index === -1) {
      return false;
    }

    services.splice(index, 1);
    await this._writeFile(services);
    return true;
  }
}

import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../data/services.json');

export class ServiceManager {
  constructor() {
    this.path = filePath;
  }
  async getServices() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      return [];
    }
  }
  async getServiceById(id) {
    const services = await this.getServices();
    const service = services.find((s) => s.id === id);
    if (!service) {
      return null;
    }
    return service;
  }
  async addService({ name, description, duration, price, category, available = true }) {
    if (
      !name ||
      !description ||
      duration === undefined ||
      price === undefined ||
      !category
    ) {
      throw new Error('Todos los campos obligatorios deben estar presentes');
    }
    const services = await this.getServices();
    const newService = {
      id: randomUUID(),
      name,
      description,
      duration: Number(duration),
      price: Number(price),
      category,
      available: Boolean(available)
    };
    services.push(newService);
    await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
    return newService;
  }
  async updateService(id, updatedData) {
    const services = await this.getServices();
    const index = services.findIndex((s) => s.id === id);
    if (index === -1) {
      return null;
    }

    const { id: _, ...dataToUpdate } = updatedData;
    services[index] = {
      ...services[index],
      ...dataToUpdate,
      id
    };
    await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
    return services[index];
  }
  async deleteService(id) {
    const services = await this.getServices();
    const serviceIndex = services.findIndex((s) => s.id === id);
    if (serviceIndex === -1) {
      return null;
    }
    const [deletedService] = services.splice(serviceIndex, 1);
    await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
    return deletedService;
  }
}
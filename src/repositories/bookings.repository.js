import { BookingsDao } from '../dao/bookings.dao.js';

export class BookingsRepository {
  constructor() {
    this.dao = new BookingsDao();
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async create(bookingData) {
    return await this.dao.create(bookingData);
  }

  async update(id, bookingData) {
    return await this.dao.update(id, bookingData);
  }
}


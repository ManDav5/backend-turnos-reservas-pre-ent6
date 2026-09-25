import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export class BookingsDao {
  constructor() {
    this.path = path.resolve('src/data/bookings.json');
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

  async create(bookingData) {
    const bookings = await this._readFile();

    const newBooking = {
      id: crypto.randomUUID(),
      clientName: bookingData.clientName,
      clientEmail: bookingData.clientEmail,
      date: bookingData.date,
      time: bookingData.time,
      status: bookingData.status || 'pending',
      services: []
    };

    bookings.push(newBooking);
    await this._writeFile(bookings);
    return newBooking;
  }

  async getById(id) {
    const bookings = await this._readFile();
    return bookings.find((b) => b.id === id) || null;
  }

  async update(id, updatedBooking) {
    const bookings = await this._readFile();
    const index = bookings.findIndex((b) => b.id === id);

    if (index === -1) {
      return null;
    }

    bookings[index] = { ...updatedBooking, id };
    await this._writeFile(bookings);
    return bookings[index];
  }
}

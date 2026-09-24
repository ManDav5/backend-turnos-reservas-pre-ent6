import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {randomUUID} from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../data/bookings.json');

export class BookingManager {
  constructor() {
    this.path = filePath;
  }

  async #readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {

      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async #writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
  }  

  async createBooking({ clientName, clientEmail, date, time, status = 'pending' }) {
    const bookings = await this.#readFile();
    const newBooking = {
      id: randomUUID(),
      clientName,
      clientEmail,
      date,
      time,
      status,
      services: [] 
    };
    bookings.push(newBooking);
    await this.#writeFile(bookings);
    return newBooking;
  }

  async getBookingById(id) {
    const bookings = await this.#readFile();
    const booking = bookings.find((b) => b.id === id);
    return booking || null;
  }

  async addServiceToBooking(bid, sid) {
    const bookings = await this.#readFile();
    const bookingIndex = bookings.findIndex((b) => b.id === bid);
    if (bookingIndex === -1) {
      return null;
    }
    const booking = bookings[bookingIndex];

    const existingServiceIndex = booking.services.findIndex(
      (item) => item.service === sid
    );
    if (existingServiceIndex !== -1) {
      booking.services[existingServiceIndex].quantity += 1;
    } else {
      booking.services.push({
        service: sid,
        quantity: 1
      });
    }

    bookings[bookingIndex] = booking;
    await this.#writeFile(bookings);
    return booking;
  }
}
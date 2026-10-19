import { Router } from 'express';
import {
  createBooking,
  getBookingById,
  addServiceToBooking
} from '../controllers/bookings.controller.js';
import { validate } from '../middlewares/validate.js';
import { bookingValidationSchema } from '../validations/bookings.validation.js';

const router = Router();

router.post('/', validate(bookingValidationSchema), createBooking);

router.get('/:bid', getBookingById);

router.post('/:bid/services/:sid', addServiceToBooking);

export default router;

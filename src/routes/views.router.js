import { Router } from 'express';
import {
  renderServicesView,
  renderAvailabilityView
} from '../controllers/views.controller.js';

const viewsRouter = Router();

viewsRouter.get('/services', renderServicesView);

viewsRouter.get('/availability', renderAvailabilityView);

export default viewsRouter;

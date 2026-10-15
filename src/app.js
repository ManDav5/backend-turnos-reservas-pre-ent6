import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
import {fileURLToPath} from 'url';

import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';
import viewsRouter from './routes/views.router.js';

const __filename = fileURLToPath (import.meta.url);
const __dirname = path.dirname (__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine ('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=>{
  res.status (200).json({
    status: 'success',
    message: 'Bienvenido a la API de Turnos y Reservas',
    endpoints: {
      services: '/api/services',
      bookings: '/api/bookings',
      viewsServices: '/views/services',
      viewsAvailability: '/views/availability'
    }
  });
});

app.use('/views', viewsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});
export default app;
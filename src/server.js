import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.config.js';
import { envConfig } from './config/env.config.js';
import { getServices, createService } from './services/services.service.js';

const startServer = async () => {
  await connectDB();

  const httpServer = createServer(app);
  const io = new Server(httpServer);

  io.on('connection', async (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    try {
      const result = await getServices({});
      socket.emit('servicesList', result.docs || result);
    } catch (error) {
      console.error('Error al emitir servicios:', error.message);
    }

    socket.on('newService', async (serviceData) => {
      try {
        const createdService = await createService(serviceData);

        io.emit('serviceCreated', createdService);
      } catch (error) {
        socket.emit('serviceError', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });

  httpServer.listen(envConfig.port, () => {
    console.log(`Servidor corriendo en http://localhost:${envConfig.port}`);
  });
};

startServer();


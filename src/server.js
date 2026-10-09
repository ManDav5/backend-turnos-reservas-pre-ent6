import app from './app.js';
import {connectDB} from './config/db.config.js';
import {envConfig} from './config/env.config.js';

const startServer = async () => {
    await connectDB()

    app.listen (envConfig.port, () => {
        console.log (`Servidor corriendo en http://localhost:${envConfig.port}`);
    });
}

startServer()

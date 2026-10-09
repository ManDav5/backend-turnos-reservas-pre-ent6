import mongoose from "mongoose";
import {envConfig} from "./env.config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(envConfig.mongoUri, {family:4});
        console.log("MongoDB Conectado");

    } catch (error) {
        console.error("Error de conexión de MongoDB:", error);
        process.exit(1);
    }
}
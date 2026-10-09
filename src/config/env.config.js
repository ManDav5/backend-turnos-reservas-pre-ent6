import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars=["PORT","NODE_ENV","MONGO_URI"];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Error de configuración: Variable de entorno indefinida ${envVar} en el archivo .env`);
    }
}

export const envConfig = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI
}
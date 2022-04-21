import { registerAs } from "@nestjs/config";

type DBEnvType = {
    connection: string
}

export const DB_ENV = 'db'
export const dbEnv = registerAs(
    DB_ENV,
    (): DBEnvType => 
        { return  { connection: process.env.MONGODB_SERVER_URL } }
);
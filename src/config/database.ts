import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "../entities/product";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,
    entities: [Product],
    synchronize: true,
    logging: false,
});


import "reflect-metadata";
import { DataSource } from "typeorm";
// import { Product } from "../entities/product";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
  url: process.env.DATABASE_URL,  // ✅ Uses Neon database URL
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  ssl: {
    rejectUnauthorized: false,  // ✅ Important for cloud databases
  },
});


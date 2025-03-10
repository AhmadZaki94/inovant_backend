import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // ✅ Ensure this is set
  entities: [__dirname + "/../entities/*.ts"], // ✅ Ensure correct path
  synchronize: true,
  ssl: {
    rejectUnauthorized: false, // ✅ Required for Neon/PostgreSQL
  },
});
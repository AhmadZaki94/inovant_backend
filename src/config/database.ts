import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, 
  entities: [__dirname + "/../entities/*.ts"], 
  synchronize: true,
  ssl: {
    rejectUnauthorized: false, 
  },
});
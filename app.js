import { PrismaClient } from "./generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import express from "express";

const app = express();

const databaseUrl = new URL(process.env.DATABASE_URL);
const adapter = new PrismaMariaDb({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 3306),
  user: databaseUrl.username,
  password: decodeURIComponent(databaseUrl.password),
  database: databaseUrl.pathname.replace("/", ""),
});
export const prisma = new PrismaClient({ adapter });
prisma
  .$connect()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));
export default app;

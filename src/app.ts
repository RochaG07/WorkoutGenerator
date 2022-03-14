import { PrismaClient } from "@prisma/client";
import express from "express";
import routes from "./routes";

export const prismaInstance = new PrismaClient();

const app = express();

app.use(express.json());

app.use(routes);


export default app;
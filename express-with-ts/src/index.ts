import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import { petRouter } from "./routes/pets.routers";

const app: Express = express();
const Port: number = 8000;

app.use(cors());

app.use("/pets", petRouter);

app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: "end point has not found" });
});

app.listen(Port, (): void => {
  console.log(`Listening on port ${Port}`);
});

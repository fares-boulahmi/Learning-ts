import express from "express";
import type { Express } from "express";
import { getRandomIndex } from "./utils";
import { pets } from "./pet";

const app: Express = express();
const Port: number = 8000;

app.get("/", (req, res) => {
  res.json(pets[getRandomIndex(pets)]);
});

app.listen(Port, (): void => {
  console.log(`Listening on port ${Port}`);
});

import express from "express";
import type { Express } from "express";
import { getRandomPet } from "./utils";
import { pets } from "./data/pets";

const app: Express = express();
const Port: number = 8000;

app.get("/", (req, res) => {
  res.json({
    "this are random pets from what we have every refresh new pets to go":
      getRandomPet(pets),
  });
});

app.get("/allpets", (req, res) => {
  res.json({
    "all the pets we have ": pets.map(({ id, ...rest }) => rest),
  });
});

app.listen(Port, (): void => {
  console.log(`Listening on port ${Port}`);
});

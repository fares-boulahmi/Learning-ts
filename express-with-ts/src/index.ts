import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";

import {
  getRandomPet,
  getPetById,
  getPetBySearch,
} from "./controllers/pets.controllers";
import { pets } from "./data/pets";
import type { PetOmit } from "./data/pets";

const app: Express = express();
const Port: number = 8000;

app.use(cors());

type RandomPet = {
  title: string;
  pet: PetOmit;
};

/**
 the main route return random pets that change in every refresh without return his id 
 */

app.get("/", (req: Request, res: Response<RandomPet>): void => {
  res.json({
    title: "this are random pet refresh to get new one",
    pet: getRandomPet(pets),
  });
});

/**
 Router to get alle the pets without any Id 
 */

type Allpets = PetOmit[];

app.get("/allpets", (req: Request, res: Response<Allpets>): void => {
  res.json(pets.map(({ id, ...rest }) => rest));
});

/**
 * get pet by search query
 *
 */

app.get("/search", (req, res): void => {
  const { ...params } = req.query;
  console.log(params);
  const petFound = getPetBySearch(params, pets);
  console.log(petFound);
  if (!petFound) {
    res.status(404).json({
      message: `there no pet found by these params `,
      ...params,
    });
  } else {
    res.json({ count: petFound.length, petfound: petFound });
  }
  res.json({ message: "under work" });
});

/**
 Endpoint to return pets by his id and to handle any error that cause by non existint ids 
 request only take id type string as params 
 response is either the pet without id or msg of failing 
 get pet by id define by her name 
 */

app.get(
  "/:id",
  (
    req: Request<{ id: string }>,
    res: Response<{ message: string } | PetOmit>,
  ): void => {
    const { id } = req.params;
    const pet = getPetById(id, pets);
    if (pet == null) {
      res.status(404).json({ message: "pet not found" });
    } else {
      res.json(pet);
    }
  },
);
app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: "end point has not found" });
});

app.listen(Port, (): void => {
  console.log(`Listening on port ${Port}`);
});

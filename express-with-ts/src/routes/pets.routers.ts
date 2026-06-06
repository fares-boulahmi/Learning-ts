import express from "express";
import type { Router, Request, Response } from "express";
import type { PetOmit } from "../data/pets";
import { pets } from "../data/pets";
import {
  getPetById,
  getRandomPet,
  getPetBySearch,
} from "../controllers/pets.controllers";
import {
  checkNemvalidateNumericId,
  pleaseAuth,
} from "../middleware/pet.middleware";

export const petRouter: Router = express.Router();

petRouter.get("/", getRandomPet);

petRouter.get("/allpets", (req: Request, res: Response<PetOmit[]>): void => {
  res.json(pets.map(({ id, ...rest }) => rest));
});

petRouter.get("/search", getPetBySearch);

petRouter.get("/:id", pleaseAuth, checkNemvalidateNumericId, getPetById);

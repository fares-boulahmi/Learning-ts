import express from "express";
import type { Request, Response } from "express";
import type { Pet, PetOmit } from "../data/pets";
import { pets } from "../data/pets";
import { getRandomIndex } from "../utils";

/**
 * this controller for main route pets to return random pets every time
 */

export function getRandomPet(
  req: Request,
  res: Response<{ title: string; pet: PetOmit }>,
): void {
  const { id, ...randomPet } = pets[getRandomIndex(pets)];
  res.json({
    title: "this are random pet refresh to get new one",
    pet: randomPet,
  });
}

/**
 * controller to return pet by id
 */

export function getPetById(
  req: Request<{ id: string }>,
  res: Response<{ message: string } | PetOmit>,
): void {
  const { id } = req.params;

  const pet: Pet | undefined = pets.find(
    (pet: Pet): boolean => pet.id.toString() == id,
  );
  if (!pet) {
    res.status(404).json({ message: "pet not found" });
  } else {
    const { id, ...targetPet } = pet;
    res.json(pet);
  }
}

/**
 * this a function for search query
 * when try to optimze this function from O(n) best case and O(n*5) run to function with O(n*5) in all case with more compicated code the only benifit is less line that why leave it with if statement for every field
 */

type SearchQueryParams = {
  name?: string;
  species?: string;
  breed?: string;
  minAge?: string;
  maxAge?: string;
  adopted?: "true" | "false";
};

export function getPetBySearch(
  req: Request<{}, unknown, {}, SearchQueryParams>,
  res: Response,
): void {
  const { ...params } = req.query;
  const { name, species, breed, minAge = 0, maxAge = 400, adopted } = params;

  let petsFound: Pet[] = pets;
  // if name exisit return match name
  if (name && petsFound.length > 1) {
    petsFound = petsFound.filter(
      (pet: Pet): boolean => pet.name.toLowerCase() == name,
    );
  }

  // if species  exisit return match species of what left
  if (species && petsFound.length > 1) {
    petsFound = petsFound.filter(
      (pet: Pet): boolean => pet.species.toLowerCase() == species,
    );
  }

  // if breed  exisit return match breed of what left
  if (breed && petsFound.length > 1) {
    petsFound = petsFound.filter(
      (pet: Pet): boolean => pet.breed.toLowerCase() == breed,
    );
  }

  // if age  exisit return match age of what left
  if ((minAge || maxAge) && petsFound.length > 1) {
    petsFound = petsFound.filter(
      (pet: Pet): boolean =>
        pet.age >= Number(minAge) && pet.age <= Number(maxAge),
    );
  }

  // if adopted  exisit return match adopted of what left
  if (adopted && petsFound.length > 1) {
    petsFound = petsFound.filter(
      (pet: Pet): boolean => pet.adopted == JSON.parse(adopted),
    );
  }

  if (petsFound.length < 1) {
    res.status(404).json({
      message: `there no pet found by these params `,
      ...params,
    });
  } else {
    res.json({
      count: petsFound.map(({ id, ...pets }) => pets).length,
      petfound: petsFound.map(({ id, ...pets }) => pets),
    });
  }
}

import type { Pet, PetOmit } from "../data/pets";
import { getRandomIndex } from "../utils";

export function getRandomPet(arr: Pet[]): PetOmit {
  const { id, ...randomPet } = arr[getRandomIndex(arr)];
  return randomPet;
}

export function getPetById(targetId: string, pets: Pet[]): PetOmit | null {
  const pet: Pet | undefined = pets.find(
    (pet: Pet): boolean => pet.id.toString() == targetId,
  );
  if (!pet) {
    return null;
  }
  const { id, ...targetPet } = pet;
  return targetPet;
}

export function getPetBySearch(petObject: any, pets: Pet[]): PetOmit[] | null {
  const { name = "", species = "", breed = "", age = 0 } = petObject;
  const petsFound: Pet[] = pets.filter(
    (pet) =>
      pet.name == name ||
      pet.species == species ||
      pet.breed == breed ||
      pet.age == age,
  );
  if (petsFound.length < 1) {
    return null;
  } else {
    return petsFound.map(({ id, ...pets }) => pets);
  }
}

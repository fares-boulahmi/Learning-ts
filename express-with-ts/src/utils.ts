import type { Pet } from "./data/pets";

export function getRandomIndex<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length);
}

export function getRandomPet(arr: Pet[]): Omit<Pet, "id"> {
  const { id, ...randomPet } = arr[getRandomIndex(arr)];
  return randomPet;
}

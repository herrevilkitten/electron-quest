import { Character } from "./database/character";

export interface Interpret {
  actor: Character;
  input: string;
}

export function interpret(interpret: Interpret) {
  return false;
}

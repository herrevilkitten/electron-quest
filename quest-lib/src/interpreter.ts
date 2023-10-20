import { Character } from "./database/character";

import { COMMANDS } from "./commands";
import { first } from "rxjs";

export interface Interpret {
  actor: Character;
  input: string;
}

export function interpret(interpret: Interpret) {
  const input = interpret.input.trim();
  const firstSpace = input.indexOf(" ");
  const args = firstSpace !== -1 ? input.substring(firstSpace).trim() : "";
  const command = firstSpace !== -1 ? input.substring(0, firstSpace) : input;

  const result = COMMANDS.find(command);
  if (result) {
    result.data?.fn(interpret.actor, args);
    return true;
  }
  return false;
}

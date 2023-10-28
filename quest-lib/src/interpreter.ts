import { Character } from "./database/character";

import { COMMANDS, Command } from "./commands";

export interface Interpret {
  actor: Character;
  input: string;
}

export function interpret(interpret: Interpret) {
  const input = interpret.input.trim();
  const firstSpace = input.indexOf(" ");
  const args = firstSpace !== -1 ? input.substring(firstSpace).trim() : "";
  const first = firstSpace !== -1 ? input.substring(0, firstSpace) : input;

  const results = COMMANDS.searchFor(first);
  let command: Command | undefined = undefined;
  if (results) {
    if (!results.found) {
      // no exact match
      const lookup = COMMANDS.allWordsFrom(results.node);
      switch (lookup.length) {
        case 0:
          interpret.actor.send("No match.");
          break;
        case 1:
          command = lookup[0]?.data;
          break;
        default:
          interpret.actor.send(
            `Did you mean ${lookup.map((command) => command.entry).join(", ")}`
          );
      }
    } else {
      command = results.node.data;
    }
  }
  if (command) {
    command.fn(interpret.actor, args);
    return true;
  }
  return false;
}

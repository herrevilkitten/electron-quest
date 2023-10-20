import { parseString } from "./communication";
import { Character } from "./database/character";
import { RUN_STATE } from "./state/run-state";
import { Trie } from "./util/trie";

import chalk from "chalk";

interface Command {
  fn: (actor: Character, args: string) => void;
}

export const COMMANDS = new Trie<Command>();

COMMANDS.add("say", {
  fn: (actor, args) => {
    actor.send(
      parseString(actor, `$n say$% "$t"`, { subject: actor, text: args })
    );
  },
});

COMMANDS.add("look", {
  fn: (actor, args) => {
    if (!actor.location) {
      actor.send(`You are not anywhere.`);
      return;
    }
    actor.send(`${chalk.yellow(actor.location.name)}`);
    if (actor.location.contents.size) {
      actor.send("You see:");
      actor.location.contents.forEach((content) => {
        actor.send(content.name);
      });
    }
  },
});

COMMANDS.add("shutdown", {
  fn: () => {
    RUN_STATE.stop();
  },
});

console.log("Done adding commmands");

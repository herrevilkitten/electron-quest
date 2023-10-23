import { sendTo, SendTo } from "./communication";
import { Character } from "./database/character";
import { RUN_STATE } from "./state/run-state";
import { Trie } from "./util/trie";

import chalk from "chalk";

export interface Command {
  fn: (actor: Character, args: string) => void;
}

export const COMMANDS = new Trie<Command>();

COMMANDS.add("say", {
  fn: (actor, args) => {
    sendTo(SendTo.SUBJECT_ROOM, `$n say$% "$t"`, {
      subject: actor,
      text: args,
    });
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

COMMANDS.add("get", {
  fn: (actor, args) => {
    if (!actor.location) {
      actor.send(`You are not anywhere.`);
      return;
    }

    const match = /^(\d+)\.(.+)$/.exec(args);
    let count = 1;
    let name = args;
    if (match) {
      count = Number(match[1]);
      name = match[2];
    }
    const item = actor.lookForItem(name, actor.location, count);
    if (item) {
      item.moveTo(actor);
      sendTo(SendTo.SUBJECT_ROOM, `$n pick$% up $N`, {
        subject: actor,
        object: item,
      });
    }
  },
});

COMMANDS.add("drop", {
  fn: (actor, args) => {
    if (!actor.location) {
      actor.send(`You are not anywhere.`);
      return;
    }

    const match = /^(\d+)\.(.+)$/.exec(args);
    let count = 1;
    let name = args;
    if (match) {
      count = Number(match[1]);
      name = match[2];
    }
    const item = actor.lookForItem(name, actor, count);
    if (item) {
      item.moveTo(actor.location);
      sendTo(SendTo.SUBJECT_ROOM, `$n drop$% $N`, {
        subject: actor,
        object: item,
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

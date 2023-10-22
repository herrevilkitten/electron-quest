import { Character } from "./database/character";
import { Item } from "./database/item";
import { Room } from "./database/room";
import { PLAYER_STATE } from "./state/player-state";

export interface Parse {
  subject?: Character | Item;
  object?: Character | Item;
  text?: string;
}

export enum SendTo {
  SUBJECT,
  OBJECT,
  SUBJECT_ROOM,
  OBJECT_ROOM,
  ALL,
  NOT_TARGET,
  NOT_SUBJECT,
  NOT_OBJECT,
}

export function sendTo(to: SendTo, pattern: string, opts: Parse) {
  let targets: Character[] = [];

  switch (to) {
    case SendTo.SUBJECT:
      if (!(opts.subject instanceof Character)) {
        throw new Error(`No Character subject with SendTo.SUBJECT`);
      }
      targets = [opts.subject];
      break;
    case SendTo.OBJECT:
      if (!(opts.object instanceof Character)) {
        throw new Error(`No Character object with SendTo.OBJECT`);
      }
      targets = [opts.object];
      break;
    case SendTo.SUBJECT_ROOM:
      if (!(opts.subject instanceof Character)) {
        throw new Error(`No Character subject with SendTo.SUBJECT_ROOM`);
      }
      if (!opts.subject.location) {
        throw new Error(`No subject location with SendTo.SUBJECT_ROOM`);
      }
      targets = [...opts.subject.location.people];
      break;
    case SendTo.OBJECT_ROOM:
      if (!(opts.object instanceof Character)) {
        throw new Error(`No Character object with SendTo.OBJECT_ROOM`);
      }
      if (!opts.object.location) {
        throw new Error(`No object location with SendTo.OBJECT_ROOM`);
      }
      targets = [...opts.object.location.people];
      break;
    case SendTo.ALL:
      targets = [...PLAYER_STATE.value];
      break;
  }

  targets.forEach((target) => {
    const output = parseString(target, pattern, opts);
    target.send(output);
  });
}

export function parseString(target: Character, pattern: string, opts: Parse) {
  let output = "";

  output = pattern.replaceAll(/\$(.)/g, (sub, args) => {
    switch (args[0]) {
      case "$":
        return "$";
      case "n":
        return target === opts.subject ? "you" : opts.subject?.name ?? "";
      case "N":
        return target === opts.object ? "you" : opts.object?.name ?? "";
      case "t":
        return opts.text ?? "";
      case "%":
        return target === opts.subject ? "" : "s";
      case "^":
        return target === opts.object ? "" : "s";
      default:
        return "";
    }
  });

  output = output.replace(/^(.)/, (sub, args) => args.toUpperCase());

  return output;
}

// %n say%^ "$t"

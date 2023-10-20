import { Character } from "./database/character";
import { Item } from "./database/item";

export interface Parse {
  subject: Character;
  object?: Character | Item;
  text?: string;
}

export function parseString(target: Character, pattern: string, opts: Parse) {
  let output = "";

  output = pattern.replaceAll(/\$(.)/g, (sub, args) => {
    console.log(sub, args);
    switch (args[0]) {
      case "$":
        return "$";
      case "n":
        return target === opts.subject ? "you" : opts.subject.fullName;
      case "N":
        return opts.object
          ? opts.object instanceof Item
            ? opts.object.name
            : opts.object.fullName
          : "";
      case "t":
        return opts.text ?? "";
      case "%":
        return target === opts.subject ? "" : "s";
      default:
        return "";
    }
  });

  return output;
}

// %n say%^ "$t"

import { Connection } from "../connection";
import { Character } from "./character";

export class Player extends Character {
  readonly connection = new Connection();

  send(output: string | string[]) {
    if (Array.isArray(output)) {
      output = output.join("\n");
    }
  }
}

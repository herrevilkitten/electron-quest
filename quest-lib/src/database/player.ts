import { ConsoleConnection } from "../connection/console-connection";
import { Character } from "./character";
import { Parse, parseString } from "../communication";

export class Player extends Character {
  readonly connection = new ConsoleConnection();

  send(output: string | string[]) {
    if (Array.isArray(output)) {
      output = output.join("\n");
    }
    this.connection.output.add(output);
  }
}

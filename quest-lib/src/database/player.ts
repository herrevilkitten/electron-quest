import { ConsoleConnection } from "../connection/console-connection";
import { Character } from "./character";

export class Player extends Character {
  readonly connection = new ConsoleConnection();

  send(output: string | string[]) {
    if (Array.isArray(output)) {
      output = output.join("\n");
    }
    this.connection.output.add(output);
  }
}

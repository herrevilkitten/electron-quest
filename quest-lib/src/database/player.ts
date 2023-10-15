import { Connection } from "../connection";

export class Player {
  readonly connection = new Connection();
  
  send(output: string | string[]) {
    if (Array.isArray(output)) {
      output = output.join("\n");
    }
  }
}

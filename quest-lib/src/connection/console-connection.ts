import { Connection } from "../connection";
import { createInterface } from "readline";

export class ConsoleConnection extends Connection {
  constructor() {
    super();

    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const consolePrompt = () => {
      readline.question(``, {}, (response) => {
        this.input.add(response.trim());
        consolePrompt();
      });
    };

    consolePrompt();
  }

  flush() {
    let output: string | undefined;

    while ((output = this.output.get())) {
      console.log(output);
    }
  }
}

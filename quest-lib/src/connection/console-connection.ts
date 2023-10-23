import { Connection } from "../connection";
import { createInterface } from "readline";
import { RUN_STATE, RunStates } from "../state/run-state";

console.log(RUN_STATE.abortController);

export class ConsoleConnection extends Connection {
  constructor() {
    super();

    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    /* The AbortController signal is not working for `readline.question`. To get around it, when the signal happens, then send CTRL+D (EOT) to readline */
    RUN_STATE.abortController.signal.addEventListener(
      "abort",
      () => {
        readline.write(null, { ctrl: true, name: "d" });
        console.log("The MUD is shutting down.");
      },
      { once: true }
    );
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

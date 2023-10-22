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

    const abortController = new AbortController();

    RUN_STATE.abortController.signal.addEventListener(
      "abort",
      () => {
        readline.write(null, { ctrl: true, name: "d" });
        console.log("The MUD is shutting down.");
      },
      { once: true }
    );
    const consolePrompt = () => {
      readline.question(``, { signal: abortController.signal }, (response) => {
        this.input.add(response.trim());
        consolePrompt();
      });
    };

    RUN_STATE.subscribe((state) => {
      if (state === RunStates.STOPPED) {
        abortController.abort();
      }
    });

    consolePrompt();
  }

  flush() {
    let output: string | undefined;

    while ((output = this.output.get())) {
      console.log(output);
    }
  }
}

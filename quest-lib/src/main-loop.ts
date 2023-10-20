import { interval, timer } from "rxjs";

import { RUN_STATE } from "./state/run-state";
import { CONFIG_STATE } from "./state/config-state";
import { PLAYER_STATE } from "./state/player-state";
import { interpret } from "./interpreter";

export function mainLoop() {
  console.log("Starting mainLoop");
  const loopsPerSecond = CONFIG_STATE.value.server.loopsPerSecond;
  const loopInterval = 1000 / loopsPerSecond;

  console.log(`${loopsPerSecond} loops per second, ${loopInterval}ms per loop`);
  let inLoop = false;
  interval(loopInterval)
    .pipe(RUN_STATE.whileRunning())
    .subscribe({
      next: () => {
        if (inLoop) {
          return;
        }
        inLoop = true;

        /* Read input from every connection */
        for (const player of [...PLAYER_STATE.value]) {
          const input = player.connection.input.get();
          if (!input) {
            continue;
          }
          player.send(`\n--> ${input}`);
          /* Process input */

          if (!interpret({ actor: player, input })) {
            player.send(`Command ${input} not recognized.`);
          }
        }

        /* Process world events */

        /* Send output */
        for (const player of [...PLAYER_STATE.value]) {
          player.connection.flush();
        }
        inLoop = false;
      },
      complete: () => {
        console.log("Completed main loop");
      },
    });

  timer(60_000)
    .pipe(RUN_STATE.whileRunning())
    .subscribe(() => {
      console.log(`Shutting down the server`);
      RUN_STATE.stop();
    });
}

import { interval } from "rxjs";

import { RUN_STATE } from "./state/run-state";
import { CONFIG_STATE } from "./state/config-state";
import { PLAYER_STATE } from "./state/player-state";

export function mainLoop() {
  console.log("Starting mainLoop");
  const loopsPerSecond = CONFIG_STATE.value.server.loopsPerSecond;
  const loopInterval = 1000 / loopsPerSecond;

  console.log(`${loopsPerSecond} loops per second, ${loopInterval}ms`);
  let inLoop = false;
  let counter = 0;
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
          player.send(`> ${input}`);
          /* Process input */
          /*
          if (!interpret(player, input)) {
            player.send(`Command ${input} not recognized.`);
          }
          */
        }

        /* Process world events */

        /* Send output */
        inLoop = false;

        counter = counter + 1;
        if (counter > 100) {
          RUN_STATE.stop();
        }
      },
      complete: () => {
        console.log("Completed main loop");
      },
    });
}

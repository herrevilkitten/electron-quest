import { Player } from "./database/player";
import { mainLoop } from "./main-loop";
import { PLAYER_STATE } from "./state/player-state";

PLAYER_STATE.addPlayer(new Player());

mainLoop();

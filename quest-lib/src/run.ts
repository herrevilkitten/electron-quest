import { Player } from "./database/player";
import { Room } from "./database/room";
import { mainLoop } from "./main-loop";
import { PLAYER_STATE } from "./state/player-state";

const player = new Player();
const room = new Room();

player.moveTo(room);

PLAYER_STATE.addPlayer(player);

mainLoop();

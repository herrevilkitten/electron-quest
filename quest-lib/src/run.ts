import { Container, Item } from "./database/item";
import { Player } from "./database/player";
import { Room } from "./database/room";
import { mainLoop } from "./main-loop";
import { PLAYER_STATE } from "./state/player-state";

const player = new Player();
const room = new Room();
const sword = new Item();
const bag = new Item();
bag.container = new Container();
sword.moveTo(bag);
bag.moveTo(room);

player.moveTo(room);

PLAYER_STATE.addPlayer(player);

mainLoop();

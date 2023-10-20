import { Item } from "./database/item";
import { Player } from "./database/player";
import { Room } from "./database/room";
import { mainLoop } from "./main-loop";
import { PLAYER_STATE } from "./state/player-state";
import { COMMANDS } from "./commands";

console.log(COMMANDS);

const player = new Player();
player.fullName = "Eric";
const room = new Room();
room.name = "Spawn";
const sword = new Item();
sword.name = "Sword";
const bag = new Item();
bag.name = "Bag";
bag.contents = new Set<Item>();
sword.moveTo(bag);
bag.moveTo(room);

player.moveTo(room);

PLAYER_STATE.addPlayer(player);

console.log(player);
console.log(bag);

mainLoop();

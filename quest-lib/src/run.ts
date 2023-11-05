import { Character } from "./database/character";
import { Item } from "./database/item";
import { Player } from "./database/player";
import { Room } from "./database/room";
import { loadWorld } from "./loader/world-loader";
import { mainLoop } from "./main-loop";
import { PLAYER_STATE } from "./state/player-state";
import { WORLD_STATE } from "./state/world-state";

function simplifyEvent(event: { [object: string]: any }) {
  const output: any = {};
  for (const [key, value] of Object.entries(event)) {
    if (value instanceof Object && "id" in value) {
      output[key] = value.id;
    } else {
      output[key] = value;
    }
  }
  return output;
}

WORLD_STATE.subscribe((event) => {
  console.log("World event:", simplifyEvent(event));
});

loadWorld();

const player = new Player();
player.name = "Eric";
const room = new Room();
room.name = "Spawn";
const sword = new Item();
sword.name = "Sword";
const bag = new Item();
bag.name = "Bag";
bag.contents = new Set<Item>();

WORLD_STATE.addRoom(room);

WORLD_STATE.moveItem(sword, bag);
WORLD_STATE.moveItem(bag, room);

WORLD_STATE.addCharacter(player);
WORLD_STATE.addItem(bag);
WORLD_STATE.addItem(sword);

player.moveTo(room);

PLAYER_STATE.addPlayer(player);

mainLoop();

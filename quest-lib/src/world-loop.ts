import { Character } from "./database/character";
import { Room } from "./database/room";
import { WORLD } from "./database/world";

function processRoom(room: Room) {

}

function processCharacter(character: Character) {
  
}

export function processWorld() {
  for (const room of WORLD.rooms.values()) {
    processRoom(room);
  }
}

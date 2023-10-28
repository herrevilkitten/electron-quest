import { BehaviorSubject, Subject } from "rxjs";
import { World } from "../database/world";
import { Player } from "../database/player";
import { Room } from "../database/room";
import { Item } from "../database/item";
import { Character } from "../database/character";

interface BaseEvent {
  type: string;
}

interface AddItemEvent {
  type: "add-item";
  item: Item;
}

interface AddCharacterEvent {
  type: "add-character";
  character: Character;
}

interface AddRoomEvent {
  type: "add-room";
  room: Room;
}

interface MoveItem {
  type: "move-item";
  item: Item;
  to: Item | Room | Character;
}

type WorldEvent = AddItemEvent | AddCharacterEvent | AddRoomEvent | MoveItem;

export class WorldState extends Subject<WorldEvent> {
  world = new World();

  addItem(item: Item) {
    this.world.items.set(item.id, item);
    this.next({
      type: "add-item",
      item,
    });
  }

  addCharacter(character: Character) {
    this.world.characters.set(character.id, character);
    this.next({
      type: "add-character",
      character,
    });
  }

  addRoom(room: Room) {
    this.world.rooms.set(room.id, room);
    this.next({
      type: "add-room",
      room,
    });
  }

  moveItem(item: Item, to: Item | Room | Character) {
    item.moveTo(to);
    this.next({ type: "move-item", item, to });
  }
}

export const WORLD_STATE = new WorldState();

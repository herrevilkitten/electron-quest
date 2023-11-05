import { BehaviorSubject, Subject } from "rxjs";
import { World } from "../database/world";
import { Player } from "../database/player";
import { Room } from "../database/room";
import { Item } from "../database/item";
import { Character } from "../database/character";

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];

type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];

type WriteableItem = { [name in WritableKeys<Item>]: Item[name] };

type WriteableCharacter = {
  [name in WritableKeys<Character>]: Character[name];
};

interface BaseEvent {
  type: string;
}

interface AddItem {
  type: "add-item";
  item: Item;
}

interface AddCharacter {
  type: "add-character";
  character: Character;
}

interface AddRoom {
  type: "add-room";
  room: Room;
}

interface MoveItem {
  type: "move-item";
  item: Item;
  to: Item | Room | Character;
}

interface SetItem {
  type: "set-item";
  item: Item;
  changes: Partial<Item>;
}

interface SetCharacter {
  type: "set-character";
  character: Character;
  changes: Partial<Character>;
}

interface SetRoom {
  type: "set-room";
  room: Room;
  changes: Partial<Room>;
}

interface MoveCharacter {
  type: "move-character";
  character: Character;
  to: Room;
}

type ItemEvent = AddItem | MoveItem | SetItem;
type CharacterEvent = AddCharacter | MoveCharacter | SetCharacter;
type RoomEvent = AddRoom | SetRoom;

type WorldEvent = ItemEvent | CharacterEvent | RoomEvent;

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

  moveCharacter(character: Character, to: Room) {
    character.moveTo(to);
    this.next({
      type: "move-character",
      character,
      to,
    });
  }

  setCharacter(character: Character, changes: Partial<Character>) {
    for (const [key, value] of Object.entries(changes)) {
      (character as any)[key] = value;
    }
    this.next({
      type: "set-character",
      character,
      changes,
    });
  }

  moveItem(item: Item, to: Item | Room | Character) {
    item.moveTo(to);
    this.next({ type: "move-item", item, to });
  }

  setItem(item: Item, changes: Partial<Item>) {
    for (const [key, value] of Object.entries(changes)) {
      (item as any)[key] = value;
    }
    this.next({
      type: "set-item",
      item,
      changes,
    });
  }

  setRoom(room: Room, changes: Partial<Room>) {
    for (const [key, value] of Object.entries(changes)) {
      (room as any)[key] = value;
    }
    this.next({
      type: "set-room",
      room,
      changes,
    });
  }
}

export const WORLD_STATE = new WorldState();

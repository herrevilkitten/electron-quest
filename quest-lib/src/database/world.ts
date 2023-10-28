import { Character } from "./character";
import { Item } from "./item";
import { Player } from "./player";
import { Room } from "./room";

export class World {
  readonly items = new Map<string, Item>();
  readonly characters = new Map<string, Character>();
  readonly rooms = new Map<string, Room>();
}

export const WORLD = new World();
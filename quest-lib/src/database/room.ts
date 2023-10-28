import { randomUUID } from "crypto";
import { Character } from "./character";
import { Item } from "./item";

export class Room {
  id = randomUUID();
  name = '';

  readonly people = new Set<Character>();
  readonly contents = new Set<Item>();
}
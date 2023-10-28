import { Item } from "./item";
import { Room } from "./room";
import { Parse, parseString } from "../communication";
import { Pool } from "../pool";
import { randomUUID } from "crypto";

export class Character {
  id = randomUUID();
  name = "";
  location?: Room;

  readonly health = new Pool('health', 100);
  readonly mana = new Pool('mana', 100);

  readonly contents = new Set<Item>();

  moveTo(room: Room) {
    this.moveFrom();

    this.location = room;
    this.location.people.add(this);
  }

  moveFrom() {
    this.location?.people.delete(this);
    this.location = undefined;
  }

  lookForItem(
    name: string,
    where: Character | Item | Room,
    count = 1
  ): Item | undefined {
    if (!where.contents) {
      return undefined;
    }
    for (const item of where.contents) {
      if (item.name === name) {
        return item;
      }
    }
    return undefined;
  }

  send(output: string | string[], options?: Parse) {}
}

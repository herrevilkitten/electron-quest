import { Item } from "./item";
import { Room } from "./room";

export class Character {
  id = "";
  fullName = "";
  location?: Room;

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
}

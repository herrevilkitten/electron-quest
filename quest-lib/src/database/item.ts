import { Character } from "./character";
import { Room } from "./room";
import { randomUUID } from "crypto";

export class Armor {}

export class Weapon {}

export class Item {
  id = randomUUID();
  name = "";
  location?: Room | Item | Character;

  weight = 0;
  contents?: Set<Item>;
  armor?: Armor;
  weapon?: Weapon;

  moveTo(location: Room | Item | Character) {
    this.moveFrom();

    if (!location.contents) {
      return;
    }
    this.location = location;
    this.location.contents?.add(this);
  }

  moveFrom() {
    if (!this.location || !this.location.contents) {
      return;
    }

    this.location.contents.delete(this);
  }

  get totalCount(): number {
    return (
      1 +
      (this.contents
        ? [...this.contents].reduce((total, item) => total + item.totalCount, 0)
        : 0)
    );
  }

  get totalWeight(): number {
    return (
      this.weight +
      (this.contents
        ? [...this.contents].reduce(
            (total, item) => total + item.totalWeight,
            0
          )
        : 0)
    );
  }
}

import { Character } from "./character";
import { Container } from "./item/container";
import { Room } from "./room";

export class Item {
  id = "";
  name = "";
  location?: Room | Container | Character;

  moveTo(location: Room | Container | Character) {
    this.moveFrom();
    this.location = location;
    this.location.contents.add(this);
  }

  moveFrom() {
    this.location?.contents.delete(this);
    this.location = undefined;
  }
}

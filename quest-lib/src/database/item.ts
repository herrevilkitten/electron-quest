import { Character } from "./character";
import { Room } from "./room";

export class Container {
  readonly contents = new Set<Item>();

  get count() {
    return this.contents.size;
  }

  get totalCount(): number {
    return [...this.contents].reduce((total, item) => {
      return total + 1 + (item.container?.totalCount ?? 0);
    }, 0);
  }

  get weight(): number {
    return [...this.contents].reduce((total, item) => {
      return total + item.weight;
    }, 0);
  }

  get totalWeight(): number {
    return [...this.contents].reduce((total, item) => {
      return total + item.weight + (item.container?.totalWeight ?? 0);
    }, 0);
  }
}

export class Item {
  id = "";
  name = "";
  location?: Room | Item | Character;

  weight = 0;
  container?: Container;

  moveTo(location: Room | Item | Character) {
    this.moveFrom();
    this.location = location;
    if (this.location instanceof Item) {
      if (this.location.container) {
        this.location.container.contents.add(this);
      }
    } else {
      this.location.contents.add(this);
    }
  }

  moveFrom() {
    if (!this.location) {
      return;
    }

    if (this.location instanceof Item) {
      if (this.location.container) {
        this.location.container.contents.delete(this);
      }
    } else {
      this.location.contents.delete(this);
    }
    this.location = undefined;
  }
}

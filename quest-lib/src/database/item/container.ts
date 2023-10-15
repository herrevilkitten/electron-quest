import { Item } from "../item";

export class Container extends Item {
  readonly contents = new Set<Item>();
}
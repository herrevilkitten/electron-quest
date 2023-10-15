import { Player } from "./player";
import { Room } from "./room";

export class World {
  readonly players = new Set<Player>();
  readonly rooms = new Set<Room>();
}
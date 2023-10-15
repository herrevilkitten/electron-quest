import { BehaviorSubject } from "rxjs";
import { World } from "../database/world";
import { Player } from "../database/player";

export class WorldState extends BehaviorSubject<World> {
  addPlayer(player: Player) {
    this.value.players.add(player);
    this.next(this.value);
  }
}

export const WORLD_STATE = new WorldState(new World());

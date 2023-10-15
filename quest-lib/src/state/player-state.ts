import { BehaviorSubject } from "rxjs";
import { Player } from "../database/player";

export class PlayerState extends BehaviorSubject<Set<Player>> {
  addPlayer(player: Player) {
    this.value.add(player);
    this.next(new Set<Player>(this.value));
  }

  removePlayer(player: Player) {
    this.value.delete(player);
    this.next(new Set<Player>(this.value));
  }
}

export const PLAYER_STATE = new PlayerState(new Set<Player>());

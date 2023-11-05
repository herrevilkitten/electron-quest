import JSON5 from "json5";

import { readFileSync } from "fs";
import { Item } from "../database/item";
import { WORLD_STATE } from "../state/world-state";
import { WORLD } from "../database/world";
import { Character } from "../database/character";
import { Room } from "../database/room";

export type WorldEventWhen = "load";

export interface BaseWorldEvent {
  on: WorldEventWhen;
  do: string;
}

export interface SpawnItemWorldEvent extends BaseWorldEvent {
  do: "spawn-item";
  item: string;
  where: string;
  children?: SpawnItemWorldEvent[];
}

export type WorldEvent = SpawnItemWorldEvent;

export interface ItemFile {
  id: string;
  name: string;
  weight: number;
  contents?: true;
}

export interface WorldFile {
  rooms: [];
  items: ItemFile[];
  characters: [];
  events?: WorldEvent[];
}

function getWhere(where: string) {
  const [type, whereId] = where.split(/\s+/);
  let location: Room | Character | Item | undefined;
  switch (type) {
    case "#room":
      location = WORLD.rooms.get(whereId);
      break;
    case "#character":
      location = WORLD.characters.get(whereId);
      break;
    case "#item":
      location = WORLD.items.get(whereId);
      break;
  }
  if (!location) {
    console.error(`No location matching ${where}`);
    return undefined;
  }

  return location;
}

export function loadWorld() {
  const file = readFileSync("world.json5", "utf8");
  const result = JSON5.parse<WorldFile>(file);
  console.log(result);

  for (const entry of result.items) {
    const item = new Item();
    WORLD_STATE.addItem(item);
    WORLD_STATE.setItem(item, {
      id: entry.id,
      name: entry.name,
      weight: entry.weight
    });
  }

  if (result.events) {
    for (const event of result.events) {
      if (event.on !== "load") {
        continue;
      }

      if (event.do == "spawn-item") {
        const item = WORLD.items.get(event.item);
        if (!item) {
          console.error(`No item matches ${event.item}`);
          continue;
        }

        const [type, whereId] = event.where.split(/\s+/);
        let location = getWhere(event.where);
        if (!location) {
          continue;
        }
        WORLD_STATE.moveItem(item, location);
      }
    }
  }
}

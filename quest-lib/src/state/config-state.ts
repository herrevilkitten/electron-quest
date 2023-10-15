import { BehaviorSubject, Subject, filter, takeUntil } from "rxjs";
import { RunStates } from "./run-state";

export interface Config {
  server: {
    loopsPerSecond: number;
  };
}

export class ConfigState extends BehaviorSubject<Config> {}

export const CONFIG_STATE = new ConfigState({
  server: { loopsPerSecond: 10 },
});

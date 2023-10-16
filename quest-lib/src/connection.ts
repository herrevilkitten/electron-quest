import { Buffer } from "./buffer";

export abstract class Connection {
  readonly input = new Buffer();
  readonly output = new Buffer();

  abstract flush(): void;
}

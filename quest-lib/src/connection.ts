import { Buffer } from "./buffer";

export class Connection {
  readonly input = new Buffer();
  readonly output = new Buffer();
}

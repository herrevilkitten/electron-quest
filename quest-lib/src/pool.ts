export class Pool {
  current = 0;
  maximum = 0;

  constructor(public type: string, value: number) {
    this.set(value);
  }

  set(amount: number) {
    this.current = amount;
    this.maximum = amount;
  }

  modify(amount: number) {
    this.current = Math.min(0, Math.max(this.maximum, this.current + amount));
  }

  increment() {
    this.modify(1);
  }

  decrement() {
    this.modify(-1);
  }

  toString() {
    return `[${this.type}](${this.current}/${this.maximum})`;
  }
}

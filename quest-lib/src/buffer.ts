import { Subject } from 'rxjs';

export class Buffer {
  subject$ = new Subject<string>();
  data: string[] = [];

  constructor() {
    this.subject$.subscribe((value) => {
      this.data.push(value);
    });
  }

  add(value: string | string[]) {
    if (!Array.isArray(value)) {
      value = [value];
    }
    for (const text of value) {
      this.subject$.next(text);
    }
  }

  clear() {
    this.data.length = 0;
  }

  get() {
    return this.data.shift();
  }
}

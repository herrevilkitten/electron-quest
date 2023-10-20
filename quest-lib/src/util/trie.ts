export class TrieNode<DATA> {
  readonly children = new Map<string, TrieNode<DATA>>();
  part = "";
  entry = "";
  data?: DATA;

  getChild(part: string) {
    return this.children.get(part);
  }

  addChild(part: string) {
    const child = new TrieNode<DATA>();
    child.part = part;
    this.children.set(part, child);
    return child;
  }
}

export class Trie<DATA> extends TrieNode<DATA> {
  readonly children = new Map<string, TrieNode<DATA>>();

  add(entry: string, data?: DATA) {
    const parts = entry.trim().split("");
    let node: TrieNode<DATA> | undefined;
    const first = parts.shift();
    if (!first) {
      return;
    }
    node = this.getChild(first);
    if (!node) {
      node = this.addChild(first);
    }
    for (const part of parts) {
      let child: TrieNode<DATA> | undefined = node.getChild(part);
      if (!child) {
        child = node.addChild(part);
      }
      node = child;
    }
    if (node) {
      if (node.entry) {
        console.error(`${node.entry} is already present.`);
      } else {
        node.entry = entry;
        node.data = data;
      }
    }
  }

  find(entry: string) {
    const parts = entry.trim().split("");
    let node: TrieNode<DATA> | undefined = this;

    for (const part of parts) {
      let child: TrieNode<DATA> | undefined = node.getChild(part);
      if (!child) {
        return undefined;
      }
      node = child;
    }
    if (node) {
      return node;
    }
    return undefined;
  }
  /*
  getChild(part: string) {
    return this.children.get(part);
  }

  addChild(part: string) {
    const child = new TrieNode<DATA>();
    child.part = part;
    this.children.set(part, child);
    return child;
  }
  */
}

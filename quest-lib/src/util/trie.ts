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

function nodeIterator<DATA, T>(
  word: string,
  root: TrieNode<DATA>,
  callback: (
    letter: string,
    node: TrieNode<DATA>,
    previousNode?: TrieNode<DATA>
  ) => T
) {
  const letters = word.split("");
  let node: TrieNode<DATA> | undefined = root;
  let previousNode: TrieNode<DATA> | undefined = undefined;

  for (let index = 0; index < letters.length; ++index) {
    if (!node) {
      break;
    }
    const letter = letters[index];
    if (!node.children.has(letter)) {
      node.children.set(letter, new TrieNode<DATA>());
    }
    node = node.children.get(letter);
    if (!node) {
      break;
    }
    if (index === letters.length - 1) {
      return callback(letter, node, previousNode);
    }
    previousNode = node;
  }
  return false;
}

export class Trie<DATA> {
  readonly root = new TrieNode<DATA>();

  add(name: string, data: DATA) {
    if (this.has(name)) {
      console.error(`'${name}' already exists`);
      return false;
    }

    const node = this.insert(name);
    if (node) {
      node.data = data;
    }
    return !!node;
  }

  insert(word: string) {
    return nodeIterator(word, this.root, (letter, node, previous) => {
      node.entry = word;
      return node;
    });
  }

  remove(word: string) {
    return nodeIterator(word, this.root, (letter, node, previous) => {
      if (node.entry) {
        if (node.children.size === 0 && previous) {
          previous.children.delete(letter);
        }
        return node;
      }
      return false;
    });
  }

  has(word: string) {
    return nodeIterator(word, this.root, (letter, node, previous) =>
      node.entry ? node : false
    );
  }

  searchFor(word: string) {
    return nodeIterator(word, this.root, (letter, node, previous) => {
      return { found: node.entry, node: node };
    });
  }

  private breadthFirstCommandList<DATA>(node: TrieNode<DATA>) {
    const nodeList: TrieNode<DATA>[] = [];
    const queue = [node];
    while (true) {
      const currentNode = queue.shift();
      if (!currentNode) {
        break;
      }
      if (currentNode.entry) {
        nodeList.push(currentNode);
      }
      queue.push(...currentNode.children.values());
    }

    return nodeList;
  }

  allWordsFrom(node?: TrieNode<DATA>) {
    return this.breadthFirstCommandList(node ?? this.root);
  }
}

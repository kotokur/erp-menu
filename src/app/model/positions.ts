export interface Item {
  name: string;
  sale: number;
}

export interface Section {
  items: Item[];
  name: string;
  sections: Section[];
}

function isItem(item: Item | Section): item is Item {
  return (item as Item).sale !== undefined;
}

function isSection(item: Item | Section): item is Section {
  return (item as Section).items !== undefined;
}

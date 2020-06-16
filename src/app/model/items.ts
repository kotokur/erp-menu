export interface Item {
  id: string;
  name: string;
  sale: number;
}

export interface Section {
  id: string;
  items: Item[];
  name: string;
  sections: Section[];
}

export function isItem(item: Item | Section): item is Item {
  return (item as Item).sale !== undefined;
}

export function isSection(item: Item | Section): item is Section {
  return (item as Section).items !== undefined;
}

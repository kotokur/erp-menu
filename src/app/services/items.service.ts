import { Injectable } from '@angular/core';
import {isItem, isSection, Item, Section} from '../model/items';
import {Observable, of} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Guid} from 'guid-typescript';

const ItemsStorageKey = 'items';

type ItemAPI = Omit<Item, 'id'>;
type SectionAPI = Omit<Section, 'id'>;

function isItemAPI(item: ItemAPI | SectionAPI): item is Item {
  return (item as ItemAPI).sale !== undefined;
}

function isSectionAPI(item: ItemAPI | SectionAPI): item is Section {
  return (item as SectionAPI).items !== undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private http: HttpClient) { }

  getItems(): Observable<Array<Item | Section>> {
    const itemsFromStorage = this.getItemsFromLocalStorage();
    if (itemsFromStorage) {
      return of(itemsFromStorage);
    }

    return this.getItemsFromFile().pipe(
      tap(items => {
        this.saveItemsToLocalStorage(items);
      }),
      take(1)
    );
  }

  getItemById(id: string): Observable<Item | Section | null> {
    return this.getItems().pipe(
      map(items => this.findItemById(items, id)),
      take(1)
    );
  }

  addItemByParentId(newItem: Omit<Item, 'id'> | Omit<Section, 'id'>, id: string) {
    return this.getItems().pipe(
      tap(items => {
        this.addItemMutable(items, id, {
          ...newItem,
          id: Guid.create().toString()
        });
        this.saveItemsToLocalStorage(items);
      }),
      take(1)
    );
  }

  saveItem(item: Item | Section) {
    return this.getItems().pipe(
      tap(items => {
        this.saveItemMutable(items, item);
        this.saveItemsToLocalStorage(items);
      }),
      take(1)
    );
  }

  removeItem(id: string): Observable<Array<Item | Section>> {
    return this.getItems().pipe(
      map(items => {
        return this.filterItems(items, id);
      }),
      tap(filteredItems => {
        this.saveItemsToLocalStorage(filteredItems);
      }),
      take(1)
    );
  }

  private filterItems(items: Array<Item | Section>, id: string): Array<Item | Section> {
    return items.filter(oneItem => oneItem.id !== id).map(oneItem => {
      if (isSection(oneItem)) {
        return {
          ...oneItem,
          items: oneItem.items.filter(item => item.id !== id),
          sections: this.removeSection(oneItem.sections, id)
        }
      } else {
        return oneItem;
      }
    });
  }

  private removeSection(sections: Array<Section>, id: string): Array<Section> {
    return sections.filter(oneSection => oneSection.id !== id).map(oneSection => {
      return {
        ...oneSection,
        items: oneSection.items.filter(item => item.id !== id),
        sections: this.removeSection(oneSection.sections, id)
      };
    });
  };

  private saveItemMutable(items: Array<Item | Section>, item: Item | Section) {
    const foundItem = this.findItemById(items, item.id);
    if (!foundItem) {
      return;
    }

    if (isItem(foundItem) && isItem(item)) {
      foundItem.name = item.name;
      foundItem.sale = item.sale;
    } else if (isSection(foundItem) && isSection(item)) {
      foundItem.name = item.name;
      foundItem.items = item.items;
      foundItem.sections = item.sections;
    }
  }

  private addItemMutable(items: Array<Item | Section>, id: string | null, newItem: Item | Section) {
    if (!id) {
      items.push(newItem);
      return;
    }

    const parent = this.findItemById(items, id);
    if (!parent || !isSection(parent)) {
      return;
    }

    if (isItem(newItem)) {
      parent.items.push(newItem);
    } else {
      parent.sections.push(newItem);
    }
  }

  private findItemById(items: Array<Item | Section>, id: string): Item | Section | null {
    const foundInSource = items.find(oneItem => oneItem.id === id);
    if (foundInSource) {
      return foundInSource;
    }

    for (const oneItem of items) {
      if (isSection(oneItem)) {
        const foundInItems = this.findItemById(oneItem.items, id);
        if (foundInItems) {
          return foundInItems;
        }

        const foundInSections = this.findItemById(oneItem.sections, id);
        if (foundInSections) {
          return foundInSections;
        }
      }
    }

    return null;
  }

  private getItemsFromFile(): Observable<Array<Item | Section>> {
    return this.http.get<Array<ItemAPI | SectionAPI>>('assets/menu.json').pipe(
      map((items) => this.addIds(items)),
      take(1)
    );
  }

  private addIds(items: Array<ItemAPI | SectionAPI>): Array<Item | Section> {
    return items.map((oneItem: ItemAPI | SectionAPI) => {
      if (isItemAPI(oneItem)) {
        return {
          ...oneItem,
          id: Guid.create().toString(),
        };
      } else if (isSectionAPI(oneItem)) {
        return {
          ...oneItem,
          id: Guid.create().toString(),
          items: this.addIds(oneItem.items) as Item[],
          sections: this.addIds(oneItem.sections) as Section[]
        };
      }
    });
  }

  private getItemsFromLocalStorage(): Array<Item | Section> | null {
    const itemsJson = localStorage.getItem(ItemsStorageKey);
    return itemsJson ? JSON.parse(itemsJson) : null;
  }

  private saveItemsToLocalStorage(items: Array<Item | Section>) {
    localStorage.setItem(ItemsStorageKey, JSON.stringify(items));
  }
}

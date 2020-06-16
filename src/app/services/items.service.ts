import { Injectable } from '@angular/core';
import {Item, Section} from '../model/items';
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

import { Injectable } from '@angular/core';
import {Item, Section} from '../model/positions';
import {Observable, of} from 'rxjs';
import {delay, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getItems(): Observable<Array<Item | Section>> {
    return of([]).pipe(
      delay(1000),
      take(1)
    );
  }
}

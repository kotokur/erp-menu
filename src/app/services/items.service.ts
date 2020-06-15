import { Injectable } from '@angular/core';
import {Item, Section} from '../model/positions';
import {Observable} from 'rxjs';
import {delay, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Array<Item | Section>> {
    return this.http.get<Array<Item | Section>>('assets/menu.json').pipe(
      delay(1000),
      take(1)
    );
  }
}

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Item, Section} from '../model/items';
import {ItemsService} from './items.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OneItemResolverService implements Resolve<Item | Section> {

  constructor(
    private itemsService: ItemsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Item | Section> {
    return this.itemsService.getItemById(route.params.id);
  }
}

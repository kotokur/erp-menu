import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Item, Section} from '../model/positions';
import {ItemsService} from './items.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsResolverService implements Resolve<Array<Item | Section>> {

  constructor(
    private itemsService: ItemsService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<Item | Section>> | Promise<Array<Item | Section>> | Array<Item | Section> {
    return this.itemsService.getItems();
  }
}

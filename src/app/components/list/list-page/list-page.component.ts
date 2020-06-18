import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Item, Section} from '../../../model/items';
import {Subscription} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {ItemsService} from '../../../services/items.service';

@Component({
  selector: 'erp-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
  items: Array<Item | Section> = [];

  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.data
      .subscribe((data: { items: Array<Item | Section> }) => {
        this.items = data.items;
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  handleDelete(id: string) {
    this.itemsService.removeItem(id).pipe(
      tap((filteredItems) => {
        this.items = filteredItems;
        console.log('!!! FILTERED ITEMS 1', this.items);
      }),
      take(1)
    ).subscribe();
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Item} from '../../model/items';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemsService} from '../../services/items.service';
import {take, tap} from 'rxjs/operators';

@Component({
  selector: 'erp-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  item: Item;
  loading = false;

  private routeSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.data
      .subscribe((data: { item: Item }) => {
        this.item = data.item;
        this.initForm();
      });
  }

  initForm() {
    this.itemForm = this.fb.group({
      name: [this.item ? this.item.name : null, [Validators.required]],
      price: [this.item ? this.item.sale : null, [Validators.required]],
    });
  }

  onSubmit() {
    const { name, price } = this.itemForm.value;
    this.loading = true;
    this.itemsService.addItemByParentId({
      name,
      sale: price
    }, this.route.snapshot.params.parentId).pipe(
      tap(() => {
        this.router.navigate(['/list']);
      }),
      take(1)
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Item} from '../../model/items';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'erp-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  item: Item;

  private routeSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
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

  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}

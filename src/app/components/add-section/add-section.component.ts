import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Item, Section} from '../../model/items';
import {ActivatedRoute, Router} from '@angular/router';
import {take, tap} from 'rxjs/operators';
import {ItemsService} from '../../services/items.service';

@Component({
  selector: 'erp-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit, OnDestroy {
  sectionForm: FormGroup;
  section: Section;
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
      .subscribe((data: { section: Section }) => {
        this.section = data.section;
        this.initForm();
      });
  }

  initForm() {
    this.sectionForm = this.fb.group({
      name: [this.section ? this.section.name : null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.section) {
      this.saveSection();
    } else {
      this.addSection();
    }

  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private addSection() {
    const { name } = this.sectionForm.value;
    this.loading = true;
    this.itemsService.addItemByParentId({
      name,
      items: [],
      sections: []
    }, this.route.snapshot.params.parentId).pipe(
      tap(() => {
        this.router.navigate(['/list']);
      }),
      take(1)
    ).subscribe();
  }

  private saveSection() {
    console.log('!!! SAVE SECTION');
  }
}

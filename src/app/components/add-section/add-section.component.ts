import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Item, Section} from '../../model/items';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'erp-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit, OnDestroy {
  sectionForm: FormGroup;
  section: Section;

  private routeSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
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
      name: [this.section.name, [Validators.required]],
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

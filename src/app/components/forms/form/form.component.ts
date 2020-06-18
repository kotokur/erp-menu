import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'erp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() headerCaption: string;
  @Input() formGroup: FormGroup;
  @Input() loading = false;
  @Output() formSubmit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formSubmit.emit();
  }
}

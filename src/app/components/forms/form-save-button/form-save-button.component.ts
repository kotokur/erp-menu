import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'erp-form-save-button',
  templateUrl: './form-save-button.component.html',
  styleUrls: ['./form-save-button.component.scss']
})
export class FormSaveButtonComponent implements OnInit {
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

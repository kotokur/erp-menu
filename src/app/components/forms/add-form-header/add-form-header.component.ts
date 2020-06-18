import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'erp-add-form-header',
  templateUrl: './add-form-header.component.html',
  styleUrls: ['./add-form-header.component.scss']
})
export class AddFormHeaderComponent implements OnInit {
  @Input() caption: string;

  constructor() { }

  ngOnInit(): void {
  }

}

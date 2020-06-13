import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'erp-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {
  @Output() singleClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.singleClick.emit();
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Item, Section} from '../../../model/positions';

@Component({
  selector: 'erp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items: Array<Item | Section>;

  constructor() { }

  ngOnInit(): void {
  }

}

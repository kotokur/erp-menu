import {Component, Input, OnInit} from '@angular/core';
import {isItem, isSection, Item, Section} from '../../../model/items';
import {NzContextMenuService, NzDropdownMenuComponent, NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'erp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() set items(items: Array<Item | Section>) {
    this.internalItems = items;
    this.treeNodes = this.convertItemsToTreeNodes(items);
  };

  get items() {
    return this.internalItems;
  }

  treeNodes = [];

  private internalItems: Array<Item | Section> = [];

  // activated node
  activatedNode?: NzTreeNode;

  constructor(private nzContextMenuService: NzContextMenuService) { }

  ngOnInit(): void {
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    if (data.node) {
      this.activatedNode = data.node;
    }
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }

  private convertItemsToTreeNodes(items: Array<Item | Section>) {
    return items.map(oneItem => {
      return {
        title: oneItem.name,
        key: oneItem.id,
        sale: isItem(oneItem) ? oneItem.sale : undefined,
        isLeaf: isItem(oneItem) ? true : false,
        children: isSection(oneItem)
          ? this.convertItemsToTreeNodes((oneItem.items as Array<Item | Section>).concat(oneItem.sections))
          : undefined
      };
    });
  }
}

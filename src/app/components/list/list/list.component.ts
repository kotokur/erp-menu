import {Component, Input, OnInit} from '@angular/core';
import {isItem, isSection, Item, Section} from '../../../model/items';
import {NzContextMenuService, NzDropdownMenuComponent, NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'erp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() set items(items: Array<Item | Section>) {
    this.internalItems = items;
    this.treeNodes = this.convertItemsToTreeNodes(items);
  }

  get items() {
    return this.internalItems;
  }

  treeNodes = [];

  private internalItems: Array<Item | Section> = [];

  // activated node
  activatedNode?: NzTreeNode;

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
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

  onAddItem(node) {
    this.router.navigate(['add-item', node.origin.key]);
  }

  onAddSection(node) {
    this.router.navigate(['add-section', node.origin.key]);
  }

  onEdit(node) {
    this.router.navigate([isItem(node.origin) ? 'edit-item' : 'edit-section', node.origin.key]);
  }

  onDelete(node) {
    console.log('!!! DELETE', node);
  }

  private convertItemsToTreeNodes(items: Array<Item | Section>) {
    return items.map(oneItem => {
      return {
        title: oneItem.name,
        key: oneItem.id,
        sale: isItem(oneItem) ? oneItem.sale : undefined,
        isLeaf: isItem(oneItem),
        children: isSection(oneItem)
          ? this.convertItemsToTreeNodes((oneItem.items as Array<Item | Section>).concat(oneItem.sections))
          : undefined
      };
    });
  }
}

import { Component, inject } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialog } from './add-channel-dialog/add-channel-dialog';

interface TreeNode {
  name: string;
  isAdd?: boolean;
  children?: TreeNode[];
}

@Component({
  imports: [MatTreeModule, MatIconModule, MatButtonModule],

  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private dialog = inject(MatDialog);

  dataSource: TreeNode[] = [
    {
      name: 'Channels',
      children: [
        { name: 'Entwicklerteam' },
        { name: 'Channel hinzufügen', isAdd: true },
      ],
    },
  ];

  childrenAccessor = (node: TreeNode) => node.children ?? [];

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  openAddChannelDialog(): void {
    this.dialog.open(AddChannelDialog);
  }

  onLeafClick(node: TreeNode): void {
    if (node.isAdd) {
      this.openAddChannelDialog();
    }
  }
}

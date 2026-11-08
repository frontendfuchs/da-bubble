import { Component, inject } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialog } from './add-channel-dialog/add-channel-dialog';

type TreeNodeKind = 'section' | 'channel' | 'add-channel' | 'dm';

interface TreeNode {
  name: string;
  kind: TreeNodeKind;
  icon?: string;
  canAdd?: boolean;
  avatar?: string;
  online?: boolean;
  isSelf?: boolean;
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
      kind: 'section',
      icon: 'workspaces',
      canAdd: true,
      children: [
        { name: 'Entwicklerteam', kind: 'channel' },
        { name: 'Channel hinzufügen', kind: 'add-channel' },
      ],
    },
    {
      name: 'Direktnachrichten',
      kind: 'section',
      icon: 'account_circle',
      children: [
        {
          name: 'Frederik Beck',
          kind: 'dm',
          avatar: 'assets/avatar/frederik-beck-avatar.svg',
          online: true,
          isSelf: true,
        },
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
    if (node.kind === 'add-channel') {
      this.openAddChannelDialog();
    }
  }
}

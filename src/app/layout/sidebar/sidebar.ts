import { Component, computed, inject } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialog } from '../add-channel-dialog/add-channel-dialog';
import { ContactService } from '../../core/contacts/contact.service';

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
  private readonly dialog = inject(MatDialog);
  private readonly contactService = inject(ContactService);

  private readonly channels: TreeNode[] = [
    { name: 'Entwicklerteam', kind: 'channel' },
    { name: 'Channel hinzufügen', kind: 'add-channel' },
  ];

  readonly dataSource = computed<TreeNode[]>(() => [
    {
      name: 'Channels',
      kind: 'section',
      icon: 'workspaces',
      canAdd: true,
      children: this.channels,
    },
    {
      name: 'Direktnachrichten',
      kind: 'section',
      icon: 'account_circle',
      children: this.contactService.contacts().map((contact): TreeNode => ({
        name: contact.name,
        kind: 'dm',
        avatar: contact.avatar || 'assets/avatar/default-avatar.svg',
        online: contact.online,
        isSelf: contact.isSelf,
      })),
    },
  ]);

  childrenAccessor = (node: TreeNode) => node.children ?? [];

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  openAddChannelDialog(): void {
    this.dialog.open(AddChannelDialog, {
      width: '800px',
      maxWidth: '90vw',
      panelClass: 'channel-dialog',
    });
  }

  onLeafClick(node: TreeNode): void {
    if (node.kind === 'add-channel') {
      this.openAddChannelDialog();
    }
  }
}

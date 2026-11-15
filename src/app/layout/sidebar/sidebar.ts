import { Component, computed, inject } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialog } from '../add-channel-dialog/add-channel-dialog';
import { ContactService } from '../../core/services/contact.service';
import { ChannelService } from '../../core/services/channel.service';
import { ActiveChatService } from '../../core/services/active-chat.service';

type TreeNodeKind = 'section' | 'channel' | 'add-channel' | 'dm';

interface TreeNode {
  id?: string;
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
  private readonly channelService = inject(ChannelService);
  private readonly activeChat = inject(ActiveChatService);

  readonly dataSource = computed<TreeNode[]>(() => [
    {
      name: 'Channels',
      kind: 'section',
      icon: 'workspaces',
      canAdd: true,
      children: [
        ...this.channelService.channels().map((channel): TreeNode => ({
          id: channel.id,
          name: channel.name,
          kind: 'channel',
        })),
        { name: 'Channel hinzufügen', kind: 'add-channel' },
      ],
    },
    {
      name: 'Direktnachrichten',
      kind: 'section',
      icon: 'account_circle',
      children: this.contactService.contacts().map((contact): TreeNode => ({
        id: contact.id,
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
      return;
    }
    if (node.kind === 'channel' && node.id) {
      this.activeChat.selectChannel(node.id);
    } else if (node.kind === 'dm' && node.id) {
      this.activeChat.selectContact(node.id);
    }
  }
}

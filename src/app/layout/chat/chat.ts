import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ActiveChatService } from '../../core/services/active-chat.service';
import { ChannelService } from '../../core/services/channel.service';
import { ContactService } from '../../core/services/contact.service';
import { Channel } from '../../core/models/channel.model';
import { ChannelDetailsDialog } from '../channel-details-dialog/channel-details-dialog';

@Component({
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  selector: 'app-chat',
  styleUrl: './chat.scss',
  templateUrl: './chat.html',
})
export class Chat {
  private readonly dialog = inject(MatDialog);
  private readonly activeChat = inject(ActiveChatService);
  private readonly channelService = inject(ChannelService);
  private readonly contactService = inject(ContactService);

  readonly activeChannel = computed(() => {
    const active = this.activeChat.active();
    if (active?.kind !== 'channel') return null;
    return (
      this.channelService.channels().find((channel) => channel.id === active.id) ?? null
    );
  });

  readonly activeContact = computed(() => {
    const active = this.activeChat.active();
    if (active?.kind !== 'dm') return null;
    return (
      this.contactService.contacts().find((contact) => contact.id === active.id) ?? null
    );
  });

  openChannelDetails(channel: Channel): void {
    this.dialog.open(ChannelDetailsDialog, {
      width: '800px',
      maxWidth: '90vw',
      panelClass: 'channel-dialog',
      data: channel,
    });
  }
}

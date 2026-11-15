import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ActiveChatService } from '../../core/services/active-chat.service';
import { ChannelService } from '../../core/services/channel.service';
import { ContactService } from '../../core/services/contact.service';

@Component({
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-chat',
  styleUrl: './chat.scss',
  templateUrl: './chat.html',
})
export class Chat {
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
}

import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Channel } from '../../core/models/channel.model';
import { ActiveChatService } from '../../core/services/active-chat.service';

@Component({
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  selector: 'app-channel-details-dialog',
  styleUrl: './channel-details-dialog.scss',
  templateUrl: './channel-details-dialog.html',
})
export class ChannelDetailsDialog {
  readonly channel = inject<Channel>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject<MatDialogRef<ChannelDetailsDialog>>(MatDialogRef);
  private readonly activeChat = inject(ActiveChatService);

  get creatorName(): string {
    return this.channel.createdBy?.trim() || 'Unbekannt';
  }

  leaveChannel(): void {
    this.activeChat.clear();
    this.dialogRef.close();
  }
}
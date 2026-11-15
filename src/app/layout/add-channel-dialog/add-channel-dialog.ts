import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ChannelService } from '../../core/services/channel.service';

@Component({
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  selector: 'app-add-channel-dialog',
  styleUrl: './add-channel-dialog.scss',
  templateUrl: './add-channel-dialog.html',
})
export class AddChannelDialog {
  private readonly dialogRef = inject<MatDialogRef<AddChannelDialog>>(MatDialogRef);
  private readonly channelService = inject(ChannelService);

  readonly name = signal('');
  readonly description = signal('');
  readonly canSubmit = computed(() => this.name().trim().length > 0);

  onNameInput(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }

  onDescriptionInput(event: Event): void {
    this.description.set((event.target as HTMLInputElement).value);
  }

  async submit(): Promise<void> {
    const name = this.name().trim();
    if (!name) return;
    try {
      await this.channelService.createChannel(name, this.description().trim());
      this.dialogRef.close();
    } catch (error) {
      console.error('Creating channel failed', error);
    }
  }
}

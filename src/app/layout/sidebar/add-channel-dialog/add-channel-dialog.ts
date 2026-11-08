import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  imports: [MatButtonModule, MatDialogModule],
  selector: 'app-add-channel-dialog',
  styleUrl: './add-channel-dialog.scss',
  templateUrl: './add-channel-dialog.html',
})
export class AddChannelDialog {}

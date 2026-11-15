import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ActiveChatService } from '../../core/services/active-chat.service';
import { ChannelDetailsDialog } from './channel-details-dialog';

describe('ChannelDetailsDialog', () => {
  let component: ChannelDetailsDialog;
  let fixture: ComponentFixture<ChannelDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelDetailsDialog],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: '1', name: 'Test', description: '' },
        },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: ActiveChatService, useValue: { clear: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelDetailsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

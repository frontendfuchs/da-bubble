import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveChatService } from '../../core/services/active-chat.service';
import { ChannelService } from '../../core/services/channel.service';
import { ContactService } from '../../core/services/contact.service';
import { Chat } from './chat';

describe('Chat', () => {
  let component: Chat;
  let fixture: ComponentFixture<Chat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chat],
      providers: [
        { provide: ActiveChatService, useValue: { active: signal(null).asReadonly() } },
        { provide: ChannelService, useValue: { channels: signal([]).asReadonly() } },
        { provide: ContactService, useValue: { contacts: signal([]).asReadonly() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Chat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

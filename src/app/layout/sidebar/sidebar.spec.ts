import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactService } from '../../core/services/contact.service';
import { ChannelService } from '../../core/services/channel.service';
import { ActiveChatService } from '../../core/services/active-chat.service';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        { provide: ContactService, useValue: { contacts: signal([]).asReadonly() } },
        { provide: ChannelService, useValue: { channels: signal([]).asReadonly() } },
        {
          provide: ActiveChatService,
          useValue: {
            active: signal(null).asReadonly(),
            selectChannel: () => {},
            selectContact: () => {},
            clear: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

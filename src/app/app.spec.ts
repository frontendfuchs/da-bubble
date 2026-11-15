import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { ContactService } from './core/services/contact.service';
import { ChannelService } from './core/services/channel.service';
import { ActiveChatService } from './core/services/active-chat.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: ContactService, useValue: { contacts: signal([]).asReadonly() } },
        { provide: ChannelService, useValue: { channels: signal([]).asReadonly() } },
        { provide: ActiveChatService, useValue: { active: signal(null).asReadonly() } },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the app layout', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
    expect(compiled.querySelector('app-chat')).toBeTruthy();
    expect(compiled.querySelector('app-thread')).toBeTruthy();
  });
});

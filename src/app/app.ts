import { Component, signal } from '@angular/core';
import { Header } from './shared/header/header';
import { Sidebar } from './layout/sidebar/sidebar';
import { Chat } from './layout/chat/chat';
import { Thread } from './layout/thread/thread';

@Component({
  selector: 'app-root',
  imports: [Header, Sidebar, Chat, Thread],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('da-bubble');
}

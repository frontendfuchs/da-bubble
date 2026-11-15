import { Injectable, signal } from '@angular/core';

export type ActiveConversation =
  | { kind: 'channel'; id: string }
  | { kind: 'dm'; id: string };

@Injectable({ providedIn: 'root' })
export class ActiveChatService {
  private readonly state = signal<ActiveConversation | null>(null);
  readonly active = this.state.asReadonly();

  selectChannel(id: string): void {
    this.state.set({ kind: 'channel', id });
  }

  selectContact(id: string): void {
    this.state.set({ kind: 'dm', id });
  }

  clear(): void {
    this.state.set(null);
  }
}

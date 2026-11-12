import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly firestore = inject(Firestore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly state = signal<Contact[]>([]);

  readonly contacts = this.state.asReadonly();

  constructor() {
    const unsubscribe = onSnapshot(
      collection(this.firestore, 'users'),
      (snapshot) => {
        this.state.set(
          snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }) as Contact)
            .sort((a, b) => a.name.localeCompare(b.name, 'de')),
        );
      },
      (error) => console.error('Loading contacts failed', error),
    );

    this.destroyRef.onDestroy(unsubscribe);
  }
}

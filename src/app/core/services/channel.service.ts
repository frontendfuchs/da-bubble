import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import {
    Firestore, addDoc, collection, onSnapshot, serverTimestamp,
} from '@angular/fire/firestore';

import { Channel } from '../models/channel.model';

@Injectable({ providedIn: 'root' })
export class ChannelService {
    private readonly firestore = inject(Firestore);
    private readonly destroyRef = inject(DestroyRef);
    private readonly state = signal<Channel[]>([]);

    readonly channels = this.state.asReadonly();

    constructor() {
        const unsubscribe = onSnapshot(
            collection(this.firestore, 'channels'),
            (snapshot) => {
                this.state.set(
                    snapshot.docs
                        .map((doc) => ({ id: doc.id, ...doc.data() }) as Channel)
                        .sort((a, b) => a.name.localeCompare(b.name, 'de')),
                );
            },
            (error) => console.error('Loading channels failed', error),
        );
        this.destroyRef.onDestroy(unsubscribe);
    }

    async createChannel(
        name: string,
        description: string,
        createdBy: string,
    ): Promise<void> {
        await addDoc(collection(this.firestore, 'channels'), {
            name,
            description,
            createdBy,
            createdAt: serverTimestamp(),
        });
    }
}
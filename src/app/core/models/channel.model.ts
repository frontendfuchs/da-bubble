import { Timestamp } from "firebase/firestore";

export interface Channel {
    id: string;
    name: string;
    description: string;
    createdAt?: Timestamp | null;
}
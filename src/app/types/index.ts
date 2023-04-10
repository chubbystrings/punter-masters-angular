import {
  PartialWithFieldValue,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';

export interface USER {
  id?: string;
  firstname: string;
  lastname: string;
  codeShared: number;
  photoURL: string;
  email: string;
  sub: number;
  rollover: boolean;
  averageRatings: number;
  gameId?: string;
  displayName?: string;
}

export interface NOTIFY {
  message: string;
  type: 'error' | 'success' | 'info';
}

export const converter = <T>() => ({
  toFirestore: (data: PartialWithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  docData,
  query,
  where,
} from '@angular/fire/firestore';
import {
  CollectionReference,
  Firestore,
  addDoc,
  setDoc,
  doc,
} from '@angular/fire/firestore';

import { lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { USER, converter } from '../types';

@Injectable({ providedIn: 'root' })
export class UserService {
  user$: Observable<USER | null>;
  usersCollectionRef: CollectionReference<USER>;

  constructor(private auth: Auth, private afs: Firestore) {
    this.user$ = user(this.auth).pipe(
      switchMap((user) => {
        console.log(user);
        return user
          ? (docData(doc(this.afs, 'users', user.uid), {
              idField: 'id',
            }) as Observable<USER>)
          : of(null);
      })
    );

    this.usersCollectionRef = collection(this.afs, 'users').withConverter(
      converter<USER>()
    );
  }

  createUser(user: USER, id: string) {
    return setDoc<USER>(
      doc(this.afs, 'users', id).withConverter(converter<USER>()),
      user
    );
  }

  checkUserEmailExists(email: string) {

    return collectionData<USER>(
      query<USER>(
        collection(this.afs, 'users') as CollectionReference<USER>,
        where('email', '==', email)
      ),
      { idField: 'id' }
    )
  }
}

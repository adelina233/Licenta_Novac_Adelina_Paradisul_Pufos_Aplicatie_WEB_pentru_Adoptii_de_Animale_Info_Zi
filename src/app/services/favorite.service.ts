import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  addFavorite(adoptId: string): Promise<void> {
    return this.authService.user$
      .pipe(
        take(1),
        switchMap((user) => {
          if (user) {
            const userId = user.uid;
            return this.firestore
              .collection('favorites')
              .doc(userId)
              .set(
                {
                  adoptIds: firebase.firestore.FieldValue.arrayUnion(adoptId),
                },
                { merge: true }
              );
          } else {
            return of(null);
          }
        })
      )
      .toPromise() as Promise<void>;
  }

  removeFavorite(adoptId: string): Promise<void> {
    return this.authService.user$
      .pipe(
        take(1),
        switchMap((user) => {
          if (user) {
            const userId = user.uid;
            return this.firestore
              .collection('favorites')
              .doc(userId)
              .set(
                {
                  adoptIds: firebase.firestore.FieldValue.arrayRemove(adoptId),
                },
                { merge: true }
              );
          } else {
            return of(null);
          }
        })
      )
      .toPromise() as Promise<void>;
  }

  getFavorites(): Observable<{ adoptIds: string[] } | null | undefined> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (user) {
          const userId = user.uid;
          return this.firestore
            .collection('favorites')
            .doc<{ adoptIds: string[] }>(userId)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}

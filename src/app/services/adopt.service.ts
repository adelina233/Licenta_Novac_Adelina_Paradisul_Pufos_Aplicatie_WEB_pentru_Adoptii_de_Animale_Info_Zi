import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { Observable, finalize, forkJoin, map, of } from 'rxjs';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AdoptService {
  private storage = getStorage(); // Obține instanța de storage

  constructor(private firestore: AngularFirestore) {}

  getAdoptList(): Observable<Adopt[]> {
    return this.firestore
      .collection('adopt')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Adopt;
            const id = a.payload.doc.id;
            data.id = id;
            return { ...data }; // Returnează datele împreună cu ID-ul documentului
          })
        )
      );
  }

  getAdoptsByIds(ids: string[]): Observable<Adopt[]> {
    if (!ids || ids.length === 0) {
      return of([]);
    }

    return this.firestore
      .collection<Adopt>('adopt', (ref) =>
        ref.where(firebase.firestore.FieldPath.documentId(), 'in', ids)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Adopt;
            const id = a.payload.doc.id;
            data.id = id;
            return { ...data };
          })
        )
      );
  }
  getAdoptLimitedList(limit: number): Observable<Adopt[]> {
    return this.firestore
      .collection<Adopt>('adopt', (ref) =>
        ref.where('isAccepted', '==', true).limit(limit)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Adopt;
            const id = a.payload.doc.id;
            data.id = id;
            return { ...data };
          })
        )
      );
  }
  uploadImage(file: File): Observable<string> {
    const filePath = `adopt/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);
    const task = uploadBytesResumable(fileRef, file);

    return new Observable<string>((observer) => {
      task.on(
        'state_changed',
        () => {}, // Progress observer
        (error) => observer.error(error), // Error observer
        () => {
          getDownloadURL(task.snapshot.ref).then((downloadURL) => {
            observer.next(downloadURL);
            observer.complete();
          });
        }
      );
    });
  }

  addAdopt(adopt: Adopt): Promise<any> {
    return this.firestore.collection('adopt').add(adopt);
  }

  getAdoptById(id: string): Observable<Adopt> {
    return this.firestore
      .collection('adopt')
      .doc<Adopt>(id)
      .valueChanges()
      .pipe(
        map((data) => {
          return { id, ...data } as Adopt;
        })
      );
  }
  updateAdopt(adopt: Adopt): Promise<void> {
    return this.firestore.collection('adopt').doc(adopt.id).update(adopt);
  }
  deleteAdopt(id: string): Promise<void> {
    return this.firestore.collection('adopt').doc(id).delete();
  }
  acceptAdopt(id: string): Promise<any> {
    return this.firestore
      .collection('adopt')
      .doc(id)
      .update({ isAccepted: true });
  }
}
export interface Adopt {
  id: string;
  age: number;
  description: string;
  gender: string;
  name: string;
  size: string;
  vaccinated: boolean;
  imageUrl?: string;
  isAccepted?: boolean;
  animalType: string; // Nou câmp
  breed: string; // Nou câmp
}

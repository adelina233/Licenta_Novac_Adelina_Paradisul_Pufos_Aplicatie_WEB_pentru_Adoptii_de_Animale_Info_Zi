import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdoptionRequest } from '../admin-adoption-requests/admin-adoption-requests.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimalDetailsDialogComponent } from '../animal-details-dialog/animal-details-dialog.component';

@Component({
  selector: 'app-admin-adopt-pending',
  templateUrl: './admin-adopt-pending.component.html',
  styleUrls: ['./admin-adopt-pending.component.css'],
})
export class AdminAdoptPendingComponent implements OnInit {
  pendingRequests$?: Observable<AdoptionRequest[]>;

  constructor(private firestore: AngularFirestore, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.pendingRequests$ = this.firestore
      .collection<AdoptionRequest>('adoptPending')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as AdoptionRequest;
            const id = a.payload.doc.id;
            data.id = id;
            console.log(id);

            return { ...data };
          })
        )
      );
  }
  openAnimalDetailsDialog(animalId: string | undefined): void {
    this.dialog.open(AnimalDetailsDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { animalId: animalId },
    });
  }

  completeAdoption(request: AdoptionRequest): void {
    // Mută documentul din `adopt` în `adoptCompleted` și șterge-l din `adopt`
    this.firestore
      .collection('adopt')
      .doc(request.animalId)
      .get()
      .subscribe((doc) => {
        if (doc.exists) {
          const adoptData = doc.data();
          if (adoptData) {
            this.firestore
              .collection('adoptCompleted')
              .doc(request.animalId)
              .set(adoptData)
              .then(() => {
                this.firestore
                  .collection('adopt')
                  .doc(request.animalId)
                  .delete()
                  .then(() => {
                    this.firestore
                      .collection('adoptPending')
                      .doc(request.id)
                      .delete();
                    console.log('ar trb sa stearga pending');
                  });
                console.log('ar trb sa stearga adopt');
              });
          }
        }
      });
  }

  cancelAdoption(request: AdoptionRequest): void {
    // Șterge documentul din `adoptPending`
    console.log(request);

    this.firestore.collection('adoptPending').doc(request.id).delete();
    this.firestore.collection('adopt').doc(request.animalId).update({
      isAccepted: true,
    });
  }
}

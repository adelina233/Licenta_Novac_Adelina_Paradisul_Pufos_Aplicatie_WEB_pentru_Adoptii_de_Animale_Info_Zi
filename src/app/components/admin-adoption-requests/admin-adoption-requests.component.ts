import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-adoption-requests',
  templateUrl: './admin-adoption-requests.component.html',
  styleUrls: ['./admin-adoption-requests.component.css'],
})
export class AdminAdoptionRequestsComponent implements OnInit {
  adoptionRequests$?: Observable<AdoptionRequest[]>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.adoptionRequests$ = this.firestore
      .collection<AdoptionRequest>('adoptionRequests')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as AdoptionRequest;
            const id = a.payload.doc.id;
            console.log(data);
            console.log(id);

            return { id, ...data };
          })
        )
      );
  }

  acceptRequest(request: AdoptionRequest): void {
    this.firestore
      .collection('adopt')
      .doc(request.animalId)
      .update({ isAccepted: false })
      .then(() => {
        this.firestore.collection('adoptPending').add(request);
        this.firestore.collection('adoptionRequests').doc(request.id).delete();
      });
  }

  rejectRequest(request: AdoptionRequest): void {
    this.firestore.collection('adoptionRequests').doc(request.id).delete();
    console.log('ceva');
  }
}
export interface AdoptionRequest {
maiAvetiAnimale: any;
  id?: string;
  animalId?: string;
  nume: string;
  prenume: string;
  varsta: number;
  profesie: string;
  cnp: string;
  nrMembriiFamilie: number;
  nrCopii: number;
  maiAvetiAnimalute: string;
  tipLocuinta: string;
  atiMaiAvutAnimale: string;
  userId?: string;
}

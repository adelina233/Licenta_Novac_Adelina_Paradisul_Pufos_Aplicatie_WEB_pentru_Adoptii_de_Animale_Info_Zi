import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdoptService, Adopt } from 'src/app/services/adopt.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-animal-details-dialog',
  templateUrl: './animal-details-dialog.component.html',
  styleUrls: ['./animal-details-dialog.component.css'],
})
export class AnimalDetailsDialogComponent implements OnInit {
  adopt$: Observable<Adopt>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { animalId: string },
    private adoptService: AdoptService
  ) {
    this.adopt$ = this.adoptService.getAdoptById(this.data.animalId);
  }

  ngOnInit(): void {
    this.adopt$ = this.adoptService.getAdoptById(this.data.animalId);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adopt, AdoptService } from 'src/app/services/adopt.service';
import { AdoptFormDialogComponent } from '../adopt-form-dialog/adopt-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adopt-single',
  templateUrl: './adopt-single.component.html',
  styleUrls: ['./adopt-single.component.css'],
})
export class AdoptSingleComponent implements OnInit {
  adopt: Adopt | null = null;

  constructor(
    private route: ActivatedRoute,
    private adoptService: AdoptService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  isAuthenticated(): boolean {
    if (this.authService.isAuthenticated) return true;
    return false;
  }

  ngOnInit(): void {
    const adoptId = this.route.snapshot.paramMap.get('id');
    if (adoptId) {
      this.adoptService.getAdoptById(adoptId).subscribe((adopt) => {
        this.adopt = adopt;
      });
    }
  }

  openAdoptFormDialog(): void {
    const adoptId = this.route.snapshot.paramMap.get('id');

    this.dialog.open(AdoptFormDialogComponent, {
      width: '600px',
      data: { animalId: adoptId },
    });
  }
}

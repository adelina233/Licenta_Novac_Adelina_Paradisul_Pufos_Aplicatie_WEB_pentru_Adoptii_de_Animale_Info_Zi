import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DonationDialogComponent } from '../donation-dialog/donation-dialog.component';

@Component({
  selector: 'app-donation-page',
  templateUrl: './donation-page.component.html',
  styleUrls: ['./donation-page.component.css'],
})
export class DonationPageComponent {
  constructor(public dialog: MatDialog) {}

  openDonationDialog(): void {
    const dialogRef = this.dialog.open(DonationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialogul de donații a fost închis');
    });
  }
}

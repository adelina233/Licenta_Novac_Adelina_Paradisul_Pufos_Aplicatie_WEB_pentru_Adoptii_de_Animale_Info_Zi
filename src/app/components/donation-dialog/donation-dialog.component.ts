import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-donation-dialog',
  templateUrl: './donation-dialog.component.html',
  styleUrls: ['./donation-dialog.component.css'],
})
export class DonationDialogComponent {
  donationForm: FormGroup;
  amountForm: FormGroup;
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DonationDialogComponent>,
    private firestore: AngularFirestore
  ) {
    this.donationForm = this.fb.group({
      cardName: ['', [Validators.required]],
      cardNumber: [
        null,
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      expirationDate: [
        '',
        [
          Validators.required,
          Validators.pattern('(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})'),
        ],
      ],
      cvv: [
        null,
        [Validators.required, Validators.pattern('^[0-9]{3,4}$')],
      ],
    });

    this.amountForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onContinue(): void {
    if (this.amountForm.valid) {
      this.step = 2;
    } else {
      this.amountForm.markAllAsTouched();
    }
  }

  onSubmit(): void {
    if (this.donationForm.valid && this.amountForm.valid) {
      const donationData = {
        cardName: this.donationForm.value.cardName,
        cardNumber: +this.donationForm.value.cardNumber, // Convertim în număr
        expirationDate: this.donationForm.value.expirationDate,
        cvv: +this.donationForm.value.cvv, // Convertim în număr
        amount: parseFloat(this.amountForm.value.amount), // Convertim în număr cu zecimale
        timestamp: new Date(),
      };

      console.log('Data trimisă pentru donație:', donationData);

      this.firestore.collection('donations').add(donationData)
        .then(() => {
          console.log('Donația a fost adăugată cu succes în Firestore!');
          this.dialogRef.close();
        })
        .catch((error) => {
          console.error('Eroare la adăugarea donației:', error);
        });
    } else {
      this.donationForm.markAllAsTouched();
      this.amountForm.markAllAsTouched();
    }
  }

  isFieldInvalid(form: FormGroup, field: string): boolean | undefined {
    return !form.get(field)?.valid && form.get(field)?.touched;
  }
}

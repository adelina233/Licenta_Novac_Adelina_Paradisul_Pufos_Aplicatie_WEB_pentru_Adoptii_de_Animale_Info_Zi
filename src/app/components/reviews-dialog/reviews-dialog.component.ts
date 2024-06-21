import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-reviews-dialog',
  templateUrl: './reviews-dialog.component.html',
  styleUrls: ['./reviews-dialog.component.css'],
})
export class ReviewsDialogComponent {
  reviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<ReviewsDialogComponent>
  ) {
    this.reviewForm = this.fb.group({
      message: ['', Validators.required],
      fullName: ['', Validators.required],
      occupation: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const newReview = {
        ...this.reviewForm.value,
        isActive: false,
      };
      this.firestore
        .collection('review')
        .add(newReview)
        .then(() => {
          console.log('Review added successfully');
          this.dialogRef.close();
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

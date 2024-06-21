import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adopt-form-dialog',
  templateUrl: './adopt-form-dialog.component.html',
  styleUrls: ['./adopt-form-dialog.component.css'],
})
export class AdoptFormDialogComponent {
  adoptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<AdoptFormDialogComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { animalId: string }
  ) {
    this.adoptForm = this.fb.group({
      nume: ['', Validators.required],
      prenume: ['', Validators.required],
      varsta: ['', [Validators.required, Validators.min(18)]],
      profesie: ['', Validators.required],
      cnp: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      nrMembriiFamilie: ['', Validators.required],
      nrCopii: ['', Validators.required],
      maiAvetiAnimalute: ['', Validators.required],
      tipLocuinta: ['', Validators.required],
      atiMaiAvutAnimale: ['', Validators.required],
    });
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  onSubmit(): void {
    if (this.adoptForm.valid) {
      const adoptionRequest = {
        ...this.adoptForm.value,
        animalId: this.data.animalId,
      };
      this.authService.user$.subscribe((user) => {
        if (user) {
          adoptionRequest.userId = user.uid;
          this.firestore
            .collection('adoptionRequests')
            .add(adoptionRequest)
            .then(() => {
              console.log('Adoption request added successfully!');
              this.dialogRef.close();
            });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

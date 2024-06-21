import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Adopt, AdoptService } from 'src/app/services/adopt.service';

@Component({
  selector: 'app-add-adopt',
  templateUrl: './add-adopt.component.html',
  styleUrls: ['./add-adopt.component.css'],
})
export class AddAdoptComponent {
  adoptForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private adoptService: AdoptService,
    public dialogRef: MatDialogRef<AddAdoptComponent>
  ) {
    this.adoptForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      gender: ['', Validators.required],
      name: ['', Validators.required],
      size: ['', Validators.required],
      vaccinated: [false, Validators.required],
      animalType: ['', Validators.required], // Nou câmp
      breed: ['', Validators.required], // Nou câmp
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.adoptForm.valid && this.selectedFile) {
      this.adoptService.uploadImage(this.selectedFile).subscribe((url) => {
        const adopt: Adopt = {
          ...this.adoptForm.value,
          isAccepted: false,
          imageUrl: url,
        };
        this.adoptService.addAdopt(adopt).then(() => {
          console.log('Adopt record added successfully!');
          this.adoptForm.reset();
          this.dialogRef.close(); // Închide dialogul după succesul adăugării
        });
      });
    } else {
      this.adoptForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  isFieldInvalid(field: string): boolean | undefined {
    return (
      !this.adoptForm.get(field)?.valid && this.adoptForm.get(field)?.touched
    );
  }
}

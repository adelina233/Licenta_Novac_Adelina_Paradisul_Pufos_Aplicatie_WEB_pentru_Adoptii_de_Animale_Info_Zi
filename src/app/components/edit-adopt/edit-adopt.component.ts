import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Adopt, AdoptService } from 'src/app/services/adopt.service';

@Component({
  selector: 'app-edit-adopt',
  templateUrl: './edit-adopt.component.html',
  styleUrls: ['./edit-adopt.component.css'],
})
export class EditAdoptComponent {
  adoptForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private adoptService: AdoptService,
    public dialogRef: MatDialogRef<EditAdoptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Adopt
  ) {
    this.adoptForm = this.fb.group({
      age: [data.age, [Validators.required, Validators.min(0)]],
      description: [data.description, Validators.required],
      gender: [data.gender, Validators.required],
      name: [data.name, Validators.required],
      size: [data.size, Validators.required],
      vaccinated: [data.vaccinated, Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.adoptForm.valid) {
      if (this.selectedFile) {
        this.adoptService.uploadImage(this.selectedFile).subscribe((url) => {
          this.updateAdopt(url);
        });
      } else {
        this.updateAdopt();
      }
    } else {
      this.adoptForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  updateAdopt(imageUrl?: string): void {
    const adopt: Adopt = {
      ...this.adoptForm.value,
      id: this.data.id,
      imageUrl: imageUrl || this.data.imageUrl,
    };
    this.adoptService.updateAdopt(adopt).then(() => {
      console.log('Adopt record updated successfully!');
      this.dialogRef.close();
    });
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

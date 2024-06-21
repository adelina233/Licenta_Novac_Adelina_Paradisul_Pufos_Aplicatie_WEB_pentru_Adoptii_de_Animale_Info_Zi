import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDetailsDialogComponent } from './animal-details-dialog.component';

describe('AnimalDetailsDialogComponent', () => {
  let component: AnimalDetailsDialogComponent;
  let fixture: ComponentFixture<AnimalDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(AnimalDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

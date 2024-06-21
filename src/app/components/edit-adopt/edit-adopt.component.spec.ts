import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdoptComponent } from './edit-adopt.component';

describe('EditAdoptComponent', () => {
  let component: EditAdoptComponent;
  let fixture: ComponentFixture<EditAdoptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdoptComponent]
    });
    fixture = TestBed.createComponent(EditAdoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

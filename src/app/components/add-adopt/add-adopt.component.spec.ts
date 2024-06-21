import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdoptComponent } from './add-adopt.component';

describe('AddAdoptComponent', () => {
  let component: AddAdoptComponent;
  let fixture: ComponentFixture<AddAdoptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdoptComponent]
    });
    fixture = TestBed.createComponent(AddAdoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

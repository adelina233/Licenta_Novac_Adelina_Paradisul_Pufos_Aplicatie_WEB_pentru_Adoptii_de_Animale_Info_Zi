import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptFormDialogComponent } from './adopt-form-dialog.component';

describe('AdoptFormDialogComponent', () => {
  let component: AdoptFormDialogComponent;
  let fixture: ComponentFixture<AdoptFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdoptFormDialogComponent]
    });
    fixture = TestBed.createComponent(AdoptFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

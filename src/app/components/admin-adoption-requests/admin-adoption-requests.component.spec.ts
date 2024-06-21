import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdoptionRequestsComponent } from './admin-adoption-requests.component';

describe('AdminAdoptionRequestsComponent', () => {
  let component: AdminAdoptionRequestsComponent;
  let fixture: ComponentFixture<AdminAdoptionRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAdoptionRequestsComponent]
    });
    fixture = TestBed.createComponent(AdminAdoptionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

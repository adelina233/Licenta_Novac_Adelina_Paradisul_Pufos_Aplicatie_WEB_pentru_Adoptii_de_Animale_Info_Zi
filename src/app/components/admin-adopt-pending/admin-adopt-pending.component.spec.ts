import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdoptPendingComponent } from './admin-adopt-pending.component';

describe('AdminAdoptPendingComponent', () => {
  let component: AdminAdoptPendingComponent;
  let fixture: ComponentFixture<AdminAdoptPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAdoptPendingComponent]
    });
    fixture = TestBed.createComponent(AdminAdoptPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

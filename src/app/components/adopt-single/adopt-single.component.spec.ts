import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptSingleComponent } from './adopt-single.component';

describe('AdoptSingleComponent', () => {
  let component: AdoptSingleComponent;
  let fixture: ComponentFixture<AdoptSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdoptSingleComponent]
    });
    fixture = TestBed.createComponent(AdoptSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

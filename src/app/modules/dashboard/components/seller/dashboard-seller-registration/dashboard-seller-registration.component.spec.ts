import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSellerRegistrationComponent } from './dashboard-seller-registration.component';

describe('DashboardSellerRegistrationComponent', () => {
  let component: DashboardSellerRegistrationComponent;
  let fixture: ComponentFixture<DashboardSellerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSellerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSellerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

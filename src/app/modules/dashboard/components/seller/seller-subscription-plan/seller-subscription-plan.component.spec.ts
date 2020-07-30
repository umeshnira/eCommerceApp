import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSubscriptionPlanComponent } from './seller-subscription-plan.component';

describe('SellerSubscriptionPlanComponent', () => {
  let component: SellerSubscriptionPlanComponent;
  let fixture: ComponentFixture<SellerSubscriptionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerSubscriptionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSubscriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

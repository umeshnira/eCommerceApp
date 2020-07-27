import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSubscriptionComponent } from './seller-subscription.component';

describe('SellerSubscriptionComponent', () => {
  let component: SellerSubscriptionComponent;
  let fixture: ComponentFixture<SellerSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

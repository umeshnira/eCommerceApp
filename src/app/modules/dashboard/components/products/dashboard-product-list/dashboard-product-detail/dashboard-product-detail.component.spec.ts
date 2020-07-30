import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductDetailComponent } from './dashboard-product-detail.component';

describe('DashboardProductDetailComponent', () => {
  let component: DashboardProductDetailComponent;
  let fixture: ComponentFixture<DashboardProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

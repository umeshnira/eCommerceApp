import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubCategoryComponent } from './dashboard-sub-category.component';

describe('DashboardSubCategoryComponent', () => {
  let component: DashboardSubCategoryComponent;
  let fixture: ComponentFixture<DashboardSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

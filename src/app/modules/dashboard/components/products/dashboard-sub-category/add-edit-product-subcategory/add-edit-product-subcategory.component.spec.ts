import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductSubcategoryComponent } from './add-edit-product-subcategory.component';

describe('AddEditProductSubcategoryComponent', () => {
  let component: AddEditProductSubcategoryComponent;
  let fixture: ComponentFixture<AddEditProductSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditProductSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

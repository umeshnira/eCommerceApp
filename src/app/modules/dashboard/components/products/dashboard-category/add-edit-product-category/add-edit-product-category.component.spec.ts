import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductCategoryComponent } from './add-edit-product-category.component';

describe('AddEditProductCategoryComponent', () => {
  let component: AddEditProductCategoryComponent;
  let fixture: ComponentFixture<AddEditProductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditProductCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

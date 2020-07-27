import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductListComponent } from './add-product-list.component';

describe('AddProductListComponent', () => {
  let component: AddProductListComponent;
  let fixture: ComponentFixture<AddProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

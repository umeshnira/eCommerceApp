import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductComponent } from './assign-product.component';

describe('AssignProductComponent', () => {
  let component: AssignProductComponent;
  let fixture: ComponentFixture<AssignProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

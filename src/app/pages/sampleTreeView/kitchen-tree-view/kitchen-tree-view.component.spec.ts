import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenTreeViewComponent } from './kitchen-tree-view.component';

describe('KitchenTreeViewComponent', () => {
  let component: KitchenTreeViewComponent;
  let fixture: ComponentFixture<KitchenTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTransactionsComponent } from './sales-transactions.component';

describe('SalesTransactionsComponent', () => {
  let component: SalesTransactionsComponent;
  let fixture: ComponentFixture<SalesTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

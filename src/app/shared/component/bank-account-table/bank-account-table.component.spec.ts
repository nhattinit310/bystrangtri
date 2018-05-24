import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountTableComponent } from './bank-account-table.component';

describe('BankAccountTableComponent', () => {
  let component: BankAccountTableComponent;
  let fixture: ComponentFixture<BankAccountTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBankAccountComponent } from './report-bank-account.component';

describe('ReportBankAccountComponent', () => {
  let component: ReportBankAccountComponent;
  let fixture: ComponentFixture<ReportBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

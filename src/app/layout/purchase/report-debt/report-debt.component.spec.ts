import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDebtComponent } from './report-debt.component';

describe('ReportDebtComponent', () => {
  let component: ReportDebtComponent;
  let fixture: ComponentFixture<ReportDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

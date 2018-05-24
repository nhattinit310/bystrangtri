import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPerformanceComponent } from './business-performance.component';

describe('BusinessPerformanceComponent', () => {
  let component: BusinessPerformanceComponent;
  let fixture: ComponentFixture<BusinessPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

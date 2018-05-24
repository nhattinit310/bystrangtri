import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChangePassComponent } from './account-change-pass.component';

describe('AccountChangePassComponent', () => {
  let component: AccountChangePassComponent;
  let fixture: ComponentFixture<AccountChangePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountChangePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

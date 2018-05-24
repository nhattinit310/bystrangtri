import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputExistsComponent } from './output-exists.component';

describe('OutputExistsComponent', () => {
  let component: OutputExistsComponent;
  let fixture: ComponentFixture<OutputExistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputExistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

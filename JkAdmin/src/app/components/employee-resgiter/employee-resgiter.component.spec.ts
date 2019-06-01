import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeResgiterComponent } from './employee-resgiter.component';

describe('EmployeeResgiterComponent', () => {
  let component: EmployeeResgiterComponent;
  let fixture: ComponentFixture<EmployeeResgiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeResgiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeResgiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

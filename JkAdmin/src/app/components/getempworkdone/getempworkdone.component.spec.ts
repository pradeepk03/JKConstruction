import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetempworkdoneComponent } from './getempworkdone.component';

describe('GetempworkdoneComponent', () => {
  let component: GetempworkdoneComponent;
  let fixture: ComponentFixture<GetempworkdoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetempworkdoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetempworkdoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

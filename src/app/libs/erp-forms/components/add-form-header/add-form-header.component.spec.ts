import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormHeaderComponent } from './add-form-header.component';

describe('AddFormHeaderComponent', () => {
  let component: AddFormHeaderComponent;
  let fixture: ComponentFixture<AddFormHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

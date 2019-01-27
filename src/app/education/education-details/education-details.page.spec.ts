import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationDetailsPage } from './education-details.page';

describe('EducationDetailsPage', () => {
  let component: EducationDetailsPage;
  let fixture: ComponentFixture<EducationDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FivePage } from './five.page';

describe('FivePage', () => {
  let component: FivePage;
  let fixture: ComponentFixture<FivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

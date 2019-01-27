import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorPage } from './advisor.page';

describe('AdvisorPage', () => {
  let component: AdvisorPage;
  let fixture: ComponentFixture<AdvisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

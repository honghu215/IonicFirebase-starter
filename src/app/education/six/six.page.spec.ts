import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixPage } from './six.page';

describe('SixPage', () => {
  let component: SixPage;
  let fixture: ComponentFixture<SixPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

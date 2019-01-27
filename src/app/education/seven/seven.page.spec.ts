import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenPage } from './seven.page';

describe('SevenPage', () => {
  let component: SevenPage;
  let fixture: ComponentFixture<SevenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SevenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

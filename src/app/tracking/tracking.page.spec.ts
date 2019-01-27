import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingPage } from './tracking.page';

describe('TrackingPage', () => {
  let component: TrackingPage;
  let fixture: ComponentFixture<TrackingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

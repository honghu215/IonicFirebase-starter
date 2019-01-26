import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographPage } from './photograph.page';

describe('PhotographPage', () => {
  let component: PhotographPage;
  let fixture: ComponentFixture<PhotographPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStartPage } from './group-start.page';

describe('GroupStartPage', () => {
  let component: GroupStartPage;
  let fixture: ComponentFixture<GroupStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupStartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

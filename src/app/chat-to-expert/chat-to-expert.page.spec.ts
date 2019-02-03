import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatToExpertPage } from './chat-to-expert.page';

describe('ChatToExpertPage', () => {
  let component: ChatToExpertPage;
  let fixture: ComponentFixture<ChatToExpertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatToExpertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatToExpertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

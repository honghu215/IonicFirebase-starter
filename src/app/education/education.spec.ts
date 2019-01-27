import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EducationPage } from './education.page';

describe('EducationPage', () => {
    let component: EducationPage;
    let fixture: ComponentFixture<EducationPage>;
    let educationPage: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EducationPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(async () => {
        fixture = await TestBed.createComponent(EducationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a list of 10 elements', () => {
        educationPage = fixture.nativeElement;
        const items = educationPage.querySelectorAll('ion-item');
        expect(items.length).toEqual(10);
    });

});

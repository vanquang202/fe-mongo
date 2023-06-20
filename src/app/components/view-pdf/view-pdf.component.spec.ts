import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPdfComponent } from './view-pdf.component';

describe('ViewPdfComponent', () => {
  let component: ViewPdfComponent;
  let fixture: ComponentFixture<ViewPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPdfComponent]
    });
    fixture = TestBed.createComponent(ViewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

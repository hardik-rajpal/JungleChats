import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitpageComponent } from './submitpage.component';

describe('SubmitpageComponent', () => {
  let component: SubmitpageComponent;
  let fixture: ComponentFixture<SubmitpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

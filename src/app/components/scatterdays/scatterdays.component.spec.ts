import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterdaysComponent } from './scatterdays.component';

describe('ScatterdaysComponent', () => {
  let component: ScatterdaysComponent;
  let fixture: ComponentFixture<ScatterdaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterdaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

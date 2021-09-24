import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimefiltersComponent } from './timefilters.component';

describe('TimefiltersComponent', () => {
  let component: TimefiltersComponent;
  let fixture: ComponentFixture<TimefiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimefiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimefiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

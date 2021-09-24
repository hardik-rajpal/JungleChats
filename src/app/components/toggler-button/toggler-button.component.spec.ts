import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglerButtonComponent } from './toggler-button.component';

describe('TogglerButtonComponent', () => {
  let component: TogglerButtonComponent;
  let fixture: ComponentFixture<TogglerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TogglerButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

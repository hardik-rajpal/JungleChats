import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylinechartComponent } from './mylinechart.component';

describe('MylinechartComponent', () => {
  let component: MylinechartComponent;
  let fixture: ComponentFixture<MylinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MylinechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MylinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

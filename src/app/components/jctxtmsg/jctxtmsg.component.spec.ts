import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JctxtmsgComponent } from './jctxtmsg.component';

describe('JctxtmsgComponent', () => {
  let component: JctxtmsgComponent;
  let fixture: ComponentFixture<JctxtmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JctxtmsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JctxtmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JclandComponent } from './jcland.component';

describe('JclandComponent', () => {
  let component: JclandComponent;
  let fixture: ComponentFixture<JclandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JclandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JclandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

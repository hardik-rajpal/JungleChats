import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwfiltersComponent } from './kwfilters.component';

describe('KwfiltersComponent', () => {
  let component: KwfiltersComponent;
  let fixture: ComponentFixture<KwfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwfiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

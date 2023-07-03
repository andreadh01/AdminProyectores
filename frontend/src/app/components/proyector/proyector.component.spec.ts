import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectorComponent } from './proyector.component';

describe('ProyectorComponent', () => {
  let component: ProyectorComponent;
  let fixture: ComponentFixture<ProyectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

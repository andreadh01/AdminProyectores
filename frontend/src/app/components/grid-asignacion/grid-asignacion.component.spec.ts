import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAsignacionComponent } from './grid-asignacion.component';

describe('GridAsignacionComponent', () => {
  let component: GridAsignacionComponent;
  let fixture: ComponentFixture<GridAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAsignacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

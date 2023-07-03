import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAsignacionComponent } from './dialog-asignacion.component';

describe('DialogAsignacionComponent', () => {
  let component: DialogAsignacionComponent;
  let fixture: ComponentFixture<DialogAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAsignacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

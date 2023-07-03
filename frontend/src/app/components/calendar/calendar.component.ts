import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  @Output() fechaSeleccionada = new EventEmitter();
  minDate = new Date();
  fecha: string[] = [];
  dateRange!: Date[];
  mensaje: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private ref: MatDialogRef<CalendarComponent>
  ) {}

  ngOnInit(): void {
    if (this.datos.fecha != undefined) {
      var fechas = this.datos.fecha.split('-');
      this.dateRange = [new Date(fechas[0]), new Date(fechas[1])];
    }
  }

  actualizar(e: any) {
    console.log(e);
    this.fecha = e;
  }

  close() {
    if (this.rangoValido(this.fecha)) {
      this.fechaSeleccionada.emit(this.fecha);
      this.ref.close();
    } else {
      console.log('aqui');
      return;
    }
  }

  rangoValido(fecha: string[]): boolean {
    if (fecha == null) {
      this.mensaje = {
        tipo: 'error',
        contenido: 'Por favor, seleccione un rango de fechas',
      };
      return false;
    }
    var fechaInicio = moment(fecha[0]).milliseconds(0);
    var fechaFin = moment(fecha[1]).milliseconds(0);

    if (fechaInicio.isSame(fechaFin)) {
      this.mensaje = {
        tipo: 'error',
        contenido:
          'La fecha y hora de inicio no puede ser igual a la fecha y hora de fin.',
      };
      return false;
    } else if (fechaInicio.isAfter(fechaFin)) {
      this.mensaje = {
        tipo: 'error',
        contenido:
          'La fecha y hora de inicio no puede ser mayor a la fecha y hora de fin.',
      };
      return false;
    } else {
      return true;
    }
  }
}

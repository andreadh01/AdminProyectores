import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { Asignacion } from 'src/app/models/asignacion';

@Component({
  selector: 'app-grid-asignacion',
  templateUrl: './grid-asignacion.component.html',
  styleUrls: ['./grid-asignacion.component.css'],
})
export class GridAsignacionComponent {
  @Input() asignaciones?: Asignacion[];
  asigCambiados: Asignacion[] = [];
  @Output() editar = new EventEmitter();
  @Output() seleccionado = new EventEmitter<Asignacion>();
  @Output() cambiados = new EventEmitter<Asignacion>();
  itemSeleccionado?: Asignacion;

  editarAsignacion(asig: Asignacion) {
    this.editar.emit(asig);
  }
  obtenerFecha(fecha: string) {
    moment.locale('es');

    var d_object = moment(fecha);
    return d_object.format('MMMM D YYYY, h:mm a');
  }

  ngOnChanges() {
    this.itemSeleccionado = undefined;
  }

  seleccionar(asig: Asignacion) {
    this.itemSeleccionado = asig;
    this.seleccionado.emit(asig);
  }
  cambiarEstatus(asig: Asignacion) {
    asig.estatus = !asig.estatus;

    this.cambiados.emit(asig);
  }
}

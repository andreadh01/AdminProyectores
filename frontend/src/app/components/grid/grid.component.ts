import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import * as moment from 'moment';
import { Proyector } from 'src/app/models/proyector';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnChanges {
  @Input() proyectores?: Proyector[];
  @Input() editable?: boolean;
  proyCambiados: Proyector[] = [];
  @Output() editar = new EventEmitter();
  @Output() seleccionado = new EventEmitter<Proyector>();
  @Output() cambiados = new EventEmitter<Proyector>();
  itemSeleccionado?: Proyector;
  editarProyector(proy: Proyector) {
    this.editar.emit(proy);
  }
  obtenerFecha(fecha: string) {
    moment.locale('es');
    var d_object = moment(fecha);
    return d_object.format('MMMM D YYYY, h:mm a');
  }

  ngOnChanges() {
    this.itemSeleccionado = undefined;
  }

  seleccionar(proy: Proyector) {
    this.itemSeleccionado = proy;
    this.seleccionado.emit(proy);
  }
  cambiarEstatus(proy: Proyector) {
    proy.estatus = !proy.estatus;

    this.cambiados.emit(proy);
  }
}

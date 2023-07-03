import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-tabla',

  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent {
  @Input() displayedColumns!: {
    key: string;
    header: string;
  }[];
  @Input() dataSource: any;
  @Output() itemAEditar = new EventEmitter();
  @Output() cambiados = new EventEmitter();
  displayedColumnsKeys: string[] = [];
  console = console;
  ngOnChanges() {
    this.displayedColumnsKeys = this.displayedColumns.map((col) => col.key);
  }

  editar(item: any) {
    this.itemAEditar.emit(item);
  }

  cambiarEstatus(item: any) {
    item.estatus = !item.estatus;

    this.cambiados.emit(item);
  }
  obtenerFecha(fecha: string) {
    // var d_object = new Date(fecha);
    // d_object.setTime(
    //   d_object.getTime() - d_object.getTimezoneOffset() * 60 * 1000
    // );
    // return d_object.toLocaleString('es-MX');

    moment.locale('es');
    var d_object = moment(fecha);
    return d_object.format('MMMM D YYYY, h:mm a');
  }
}

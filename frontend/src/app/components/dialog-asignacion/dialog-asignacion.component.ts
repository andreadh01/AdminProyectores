import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Proyector } from 'src/app/models/proyector';
import { GlobalService } from 'src/app/services/global.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { LoaderService } from 'src/app/services/loader.service';

defineLocale('es', esLocale);
@Component({
  selector: 'app-dialog-asignacion',
  templateUrl: './dialog-asignacion.component.html',
  styleUrls: ['./dialog-asignacion.component.css'],
})
export class DialogAsignacionComponent implements OnInit {
  proyectores: Proyector[] = [];
  datosInput: any;
  asignacion: any;
  mensaje: any;
  selected: boolean = false;
  loading = false;
  closemessage = {
    tipo: 'success',
    contenido: 'Los cambios se han cambiado de manera exitosa.',
  };
  public isMobileLayout = window.innerWidth <= 991;
  @ViewChild('template') dialogTemplate!: TemplateRef<any>;
  format = 'MMMM D YYYY, h:mm a';

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private ref: MatDialogRef<DialogAsignacionComponent>,
    private service: GlobalService,
    private bsLocaleService: BsLocaleService,
    private dialog: MatDialog,
    public loaderService: LoaderService
  ) {
    this.bsLocaleService.use('es');
  }
  ngOnInit(): void {
    this.datosInput = this.datos;
    if (this.datosInput.code > 0) {
      this.recibirInformacion(this.datosInput.code);
    }
    window.onresize = () => {
      this.isMobileLayout = window.innerWidth <= 991;
    };
  }

  closeConfirm() {
    const dialogRef =
      this.dialog.openDialogs[this.dialog.openDialogs.length - 1];
    dialogRef.close();
  }
  obtenerProyectores() {
    var fechaSeleccionada = this.datosInput.formGroup.value.fechaInicio;
    if (fechaSeleccionada == null) {
      this.mensaje = {
        tipo: 'error',
        contenido: 'Por favor, seleccione un rango de fechas',
      };
      return;
    }
    var fechaSeleccionada =
      this.datosInput.formGroup.value.fechaInicio.split('-');

    console.log(fechaSeleccionada);
    const fechaInicio = fechaSeleccionada[0];
    const fechaFin = fechaSeleccionada[1];

    this.selected = false;

    this.datosInput.formGroup.patchValue({
      proyectorId: null,
      proyector: null,
    });
    var f1 = moment(fechaInicio, this.format)
      .subtract(7, 'hours')
      .toISOString();
    var f2 = moment(fechaInicio, this.format)
      .subtract(7, 'hours')
      .toISOString();

    this.service
      .getProyectoresDisponibles(f1, f2)
      .subscribe((result: Proyector[]) => (this.proyectores = result));
  }

  proyectorSeleccionado(proy: Proyector) {
    this.datosInput.formGroup.patchValue({
      proyectorId: proy.id,
      proyector: proy,
    });
    this.selected = true;
    var confirmDialog = this.dialog.open(this.dialogTemplate, {
      width: '50%',
      minHeight: 'max-content',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }

  recibirInformacion(code: number) {
    this.service.getAsignacion(code).subscribe((item) => {
      this.asignacion = item;
      this.selected = true;

      var fecha = this.obtenerFecha(
        this.asignacion.fechaInicio,
        this.asignacion.fechaFin
      );

      console.log(fecha);

      this.datosInput.formGroup.setValue({
        id: this.asignacion.id,
        nombre: this.asignacion.nombre,
        fechaAgregado: this.asignacion.fechaAgregado,
        fechaInicio: fecha,
        fechaFin: this.asignacion.fechaFin,
        proyectorId: this.asignacion.proyectorId,
        proyector: this.asignacion.proyector,
        estatus: this.asignacion.estatus,
      });
    });
  }

  obtenerFecha(fecha1: string, fecha2: string) {
    moment.locale('es');
    var fechaInicio = moment(fecha1);
    var fechaFin = moment(fecha2);

    var fecha_formateada =
      fechaInicio.format(this.format) + ' - ' + fechaFin.format(this.format);

    return fecha_formateada;
  }

  closeModal(success = false) {
    var msg = success ? this.closemessage : '';
    this.ref.close(msg);
  }

  guardar() {
    var fechaSeleccionada =
      this.datosInput.formGroup.value.fechaInicio.split('-');

    console.log(fechaSeleccionada);
    this.datosInput.formGroup.patchValue({
      fechaFin: moment(fechaSeleccionada[1], this.format)
        .subtract(7, 'hours')
        .toISOString(),
      fechaInicio: moment(fechaSeleccionada[0], this.format)
        .subtract(7, 'hours')
        .toISOString(),
    });

    if (this.datosInput.formGroup.valid) {
      this.service
        .guardarAsignacion(this.datosInput.formGroup.value)
        .subscribe({
          complete: () => {
            this.closeModal(true);
          }, // completeHandler
          error: (e) => {
            console.log(e);
            this.mensaje = e.error;
          }, // errorHandler
        });
    } else {
      this.mensaje = {
        tipo: 'error',
        contenido: 'Por favor, llene todos los campos.',
      };
    }
  }

  abrirCalendario() {
    console.log(this.datosInput.formGroup.value.fechaInicio);
    var _popup = this.dialog.open(CalendarComponent, {
      minWidth: 'fit-content',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Seleccione el rango de fecha y hora',
        fecha: this.datosInput.formGroup.value.fechaInicio,
      },
    });
    _popup.componentInstance.fechaSeleccionada.subscribe((item) => {
      var fecha = this.obtenerFecha(item[0], item[1]);
      this.datosInput.formGroup.patchValue({
        fechaInicio: fecha,
      });
    });
  }
}

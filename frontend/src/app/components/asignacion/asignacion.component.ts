import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Asignacion } from 'src/app/models/asignacion';
import { GlobalService } from 'src/app/services/global.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DialogAsignacionComponent } from '../dialog-asignacion/dialog-asignacion.component';
import * as moment from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css'],
})
export class AsignacionComponent {
  mensaje: any;
  asignaciones: Asignacion[] = [];
  grid = false;
  columnasDisplay = [
    {
      key: 'id',
      header: 'Id',
    },
    {
      key: 'fechaAgregado',
      header: 'Fecha agregado',
    },
    {
      key: 'nombre',
      header: 'Nombre',
    },
    {
      key: 'fechaInicio',
      header: 'Fecha inicio',
    },
    {
      key: 'fechaFin',
      header: 'Fecha fin',
    },
    {
      key: 'estatus',
      header: 'Estatus',
    },
    {
      key: 'proyector',
      header: 'Proyector',
    },
    {
      key: 'editar',
      header: 'Editar',
    },
  ];
  asigCambiados: Asignacion[] = [];
  loading = false;
  constructor(
    private service: GlobalService,
    private buildr: FormBuilder,
    private dialog: MatDialog,
    public loaderService: LoaderService
  ) {}

  agregarAsignacion() {
    this.openModal(0, 'Agregar Asignación', DialogAsignacionComponent);
  }

  editarAsignacion(asig: Asignacion) {
    var code = asig.id || 0;
    this.openModal(code, 'Editar Asignación', DialogAsignacionComponent);
  }

  guardar() {
    this.asigCambiados.forEach((proy) => {
      this.service.guardarAsignacion(proy).subscribe((response) => {
        this.mensaje = response;
        this.asigCambiados = [];
      });
    });
  }
  changeView(valor: boolean) {
    this.grid = valor;
  }
  openModal(code: number, title: string, component: any) {
    var _popup = this.dialog.open(component, {
      width: '70%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        code: code,
        formGroup: this.buildr.group({
          id: this.buildr.control(0),
          nombre: [null, Validators.required],
          fechaAgregado: this.buildr.control(
            moment().subtract(7, 'hours').toISOString()
          ),
          fechaInicio: [null, [Validators.required]],
          fechaFin: [null, [Validators.required]],
          proyectorId: [null, Validators.required],
          proyector: [null, Validators.required],
          estatus: this.buildr.control(false),
        }),
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item)
      this.mensaje = item;
      this.loadItems();
    });
  }

  agregarCambio(asig: Asignacion) {
    var index = this.asigCambiados.findIndex((obj) => obj.id === asig.id);

    if (index > -1) {
      this.asigCambiados.splice(index, 1);
    } else {
      this.asigCambiados.push(asig);
    }
  }
  loadItems() {
    this.service
      .getAsignaciones()
      .subscribe((result: Asignacion[]) => (this.asignaciones = result));
  }

  ngOnInit(): void {
    this.loadItems();
  }
}

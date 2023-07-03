import { Component, Input } from '@angular/core';
import { Proyector } from 'src/app/models/proyector';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-proyector',
  templateUrl: './proyector.component.html',
  styleUrls: ['./proyector.component.css'],
})
export class ProyectorComponent {
  @Input() proyector?: Proyector;
  proyectores: Proyector[] = [];
  proyCambiados: Proyector[] = [];
  mensaje: any;
  grid: boolean = true;
  table: boolean = false;
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
      key: 'serie',
      header: 'Número de serie',
    },
    {
      key: 'estatus',
      header: 'Estatus',
    },
    {
      key: 'editar',
      header: 'Editar',
    },
  ];
  constructor(
    private service: GlobalService,
    private buildr: FormBuilder,
    private dialog: MatDialog,
    public loaderService: LoaderService
  ) {}

  agregarProyector() {
    this.openModal(0, 'Agregar Proyector', DialogComponent);
  }

  editarProyector(proy: Proyector) {
    var code = proy.id || 0;
    this.openModal(code, 'Editar Proyector', DialogComponent);
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
          serie: [null, Validators.required],
          estatus: this.buildr.control(false),
        }),
        formColumns: ['Nombre', 'Número de serie'],
      },
    });
    _popup.afterClosed().subscribe((item) => {
      this.mensaje = item;
      this.loadItems();
    });
  }

  agregarCambio(proy: Proyector) {
    var index = this.proyCambiados.findIndex((obj) => obj.id === proy.id);

    if (index > -1) {
      this.proyCambiados.splice(index, 1);
    } else {
      this.proyCambiados.push(proy);
    }
  }

  guardar() {
    this.proyCambiados.forEach((proy) => {
      this.service.guardarProyector(proy).subscribe((response) => {
        this.mensaje = response;
        this.proyCambiados = [];
      });
    });
  }

  loadItems() {
    this.service
      .getProyectores()
      .subscribe((result: Proyector[]) => (this.proyectores = result));
  }

  ngOnInit(): void {
    this.loadItems();
  }
}

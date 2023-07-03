import { Proyector } from './proyector';

export class Asignacion {
  id?: number;
  fechaAgregado: string = '';
  nombre: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  proyectorId: number = 0;
  proyector!: Proyector;
  estatus: boolean = false;
}

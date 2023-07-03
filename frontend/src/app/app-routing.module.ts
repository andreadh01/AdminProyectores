import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectorComponent } from './components/proyector/proyector.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
const routes: Routes = [
  { path: 'asignaciones', component: AsignacionComponent },
  { path: 'proyectores', component: ProyectorComponent },
  { path: '**', redirectTo: '/proyectores' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProyectorComponent } from './components/proyector/proyector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { GridComponent } from './components/grid/grid.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { DialogAsignacionComponent } from './components/dialog-asignacion/dialog-asignacion.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GridAsignacionComponent } from './components/grid-asignacion/grid-asignacion.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InterceptorService } from './services/interceptor.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    AppComponent,
    ProyectorComponent,
    SidenavComponent,
    AsignacionComponent,
    MensajeComponent,
    GridComponent,
    TablaComponent,
    DialogComponent,
    DialogAsignacionComponent,
    CalendarComponent,
    GridAsignacionComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

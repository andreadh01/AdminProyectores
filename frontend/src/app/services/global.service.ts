import { Injectable } from '@angular/core';
import { Proyector } from '../models/proyector';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Asignacion } from '../models/asignacion';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private http: HttpClient) {}

  public getProyectores(): Observable<Proyector[]> {
    return this.http.get<Proyector[]>(`${environment.apiUrl}/Proyector`);
  }

  public getProyector(id: number): Observable<Proyector> {
    return this.http.get<Proyector>(`${environment.apiUrl}/Proyector/${id}`);
  }

  public getProyectoresDisponibles(
    fechaInicio: string,
    fechaFin: string
  ): Observable<Proyector[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<Proyector[]>(
      `${environment.apiUrl}/Asignacion/details`,
      { params }
    );
  }

  public guardarProyector(proy: any): Observable<any> {
    if (proy.id == 0) {
      return this.http.post(`${environment.apiUrl}/Proyector`, proy);
    }
    return this.http.put(`${environment.apiUrl}/Proyector`, proy);
  }

  public getAsignaciones(): Observable<Asignacion[]> {
    return this.http.get<Asignacion[]>(`${environment.apiUrl}/Asignacion`);
  }

  public getAsignacion(id: number): Observable<Asignacion> {
    return this.http.get<Asignacion>(`${environment.apiUrl}/Asignacion/${id}`);
  }

  public guardarAsignacion(asig: any): Observable<any> {
    if (asig.id == 0) {
      return this.http.post(`${environment.apiUrl}/Asignacion`, asig);
    }
    return this.http.put(`${environment.apiUrl}/Asignacion`, asig);
  }
}

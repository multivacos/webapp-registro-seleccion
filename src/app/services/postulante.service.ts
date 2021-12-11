import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postulante } from '../Model/Postulante';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {

  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) { }

  consultarPostulante(): Observable<Postulante[]> {
    return this.httpClient.get<Postulante[]>(`${environment.apiUrl}/consultarFormularios`);
  }

  actualizarPostulante(postulante: Postulante): Observable<Postulante> {
    return this.httpClient.put<Postulante>(`${environment.apiUrl}/actualizarFormulario`, postulante, { headers: this.headers });
  }

  eliminarPostulante(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/eliminarFormulario/${id}`);
  }
}

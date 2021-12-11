import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postulante } from '../Model/Postulante';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {

  private baseUrl = 'http://localhost:8050/formularios';

  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) { }

  consultarPostulante(): Observable<Postulante[]> {
    return this.httpClient.get<Postulante[]>(`${this.baseUrl}/consultarFormularios`);
  }

  actualizarPostulante(postulante: Postulante): Observable<Postulante> {
    return this.httpClient.put<Postulante>(`${this.baseUrl}/actualizarFormulario`, postulante, { headers: this.headers });
  }

  eliminarPostulante(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/eliminarFormulario/${id}`);
  }
}

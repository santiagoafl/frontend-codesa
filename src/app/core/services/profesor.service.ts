import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor, ProfesorResponse } from '../../core/models/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://localhost:8080/api/profesores';
  
  constructor(private http: HttpClient) { }

  crear(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiUrl, profesor);
  }

  listarPaginado(page: number = 0, size: number = 10): Observable<ProfesorResponse> {
    return this.http.get<ProfesorResponse>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  actualizar(id: number, profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.apiUrl}/${id}`, profesor);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';


import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiEstudiantes = 'http://localhost:8080/api/estudiantes';
  private apiProfesores = 'http://localhost:8080/api/profesores';

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Persona[]> {
    return forkJoin({
      estudiantes: this.http.get<any>(`${this.apiEstudiantes}?size=1000`),
      profesores: this.http.get<any>(`${this.apiProfesores}?size=1000`)
    }).pipe(
      map(({ estudiantes, profesores }) => {
        const personasEstudiantes: Persona[] = estudiantes.content.map((e: any) => ({
          ...e,
          tipo: 'Estudiante'
        }));

        const personasProfesores: Persona[] = profesores.content.map((p: any) => ({
          ...p,
          tipo: 'Profesor'
        }));

        return [...personasEstudiantes, ...personasProfesores];
      })
    );
  }


}

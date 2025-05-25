export interface Estudiante {
  idPersona: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  grado: string;
  numeroMatricula: string;
  fechaNacimiento: string;
}

export interface EstudianteResponse {
  content: Estudiante[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
export interface Profesor {
  idPersona: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  fechaContratacion: string;
  especialidad: string;
}

export interface ProfesorResponse {
  content: Profesor[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
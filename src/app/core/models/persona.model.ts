export interface Persona {
  idPersona: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  tipo: 'Estudiante' | 'Profesor'; 
}
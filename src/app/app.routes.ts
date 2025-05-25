import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const routes: Routes = [
{
  path: '',
  component: LayoutComponent,
  children: [
    { path: '', redirectTo: 'personas', pathMatch: 'full' },
    { path: 'personas', loadComponent: () => import('./features/personas/personas.component').then(m => m.PersonasComponent) },    
    { path: 'estudiantes', loadComponent: () => import('./features/estudiantes/estudiantes.component').then(m => m.EstudiantesComponent) },
    { path: 'profesores', loadComponent: () => import('./features/profesores/profesores.component').then(m => m.ProfesoresComponent) },

  ]
}
];
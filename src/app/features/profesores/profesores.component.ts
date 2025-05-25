import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProfesorService } from '../../core/services/profesor.service';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';


import { Profesor } from '../../core/models/profesor.model';
import { FormularioProfesorComponent } from './formulario-profesor/formulario-profesor.component';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, CommonModule,MatPaginatorModule, MatDialogModule],
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono', 'especialidad', 'fechaContratacion', 'acciones'];
  dataSource: any[] = [];
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private profesorService: ProfesorService,   private dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerPagina(this.pageIndex, this.pageSize);
  }

  obtenerPagina(page: number, size: number) {
    this.profesorService.listarPaginado(page, size).subscribe(data => {
      this.dataSource = data.content;
      this.totalItems = data.totalElements;
      this.pageIndex = data.number;
    });
  }

  cambiarPagina(event: PageEvent) {
    this.obtenerPagina(event.pageIndex, event.pageSize);
  }
  eliminar(profesor: Profesor) {
  Swal.fire({
    title: `¿Deseas eliminar a ${profesor.nombre}?`,
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.profesorService.eliminar(profesor.idPersona).subscribe(() => {
        this.obtenerPagina(this.pageIndex, this.pageSize);
        Swal.fire({
          icon: 'success',
          title: 'Profesor eliminado',
          text: 'El profesor ha sido eliminado correctamente.',
          showConfirmButton: true
        });
      });
    }
  });
}

abrirFormulario(profesor: Profesor | null = null) {
  const dialogRef = this.dialog.open(FormularioProfesorComponent, {
    width: '400px',
    data: profesor
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      if (profesor) {
        this.profesorService.actualizar(profesor.idPersona, resultado).subscribe(() => {
          this.obtenerPagina(this.pageIndex, this.pageSize);
          Swal.fire({
            icon: 'success',
            title: 'Profesor actualizado',
            text: 'Los cambios fueron guardados correctamente.',
            showConfirmButton: true
          });
        });
      } else {
        this.profesorService.crear(resultado).subscribe(() => {
          this.obtenerPagina(this.pageIndex, this.pageSize);
          Swal.fire({
            icon: 'success',
            title: 'Profesor creado',
            text: 'El profesor fue registrado exitosamente.',
            showConfirmButton: true
          });
        });
      }
    }
  });
}
}
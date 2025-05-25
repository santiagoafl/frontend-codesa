import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { EstudianteService } from '../../core/services/estudiante.service';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormularioEstudianteComponent } from './formulario-estudiante/formulario-estudiante.component';
import { Estudiante } from '../../core/models/estudiante.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, CommonModule,MatPaginatorModule, MatDialogModule],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono', 'grado', 'numeroMatricula', 'acciones'];
  dataSource: any[] = [];

  constructor(private estudianteService: EstudianteService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerPagina(this.pageIndex, this.pageSize);
  }

  obtenerPagina(page: number, size: number) {
    this.estudianteService.listarPaginado(page, size).subscribe(data => {
      this.dataSource = data.content;
      this.totalItems = data.totalElements;
      this.pageIndex = data.number;
    });
  }

  cambiarPagina(event: PageEvent) {
    this.obtenerPagina(event.pageIndex, event.pageSize);
  }
  eliminar(estudiante: any) {
    Swal.fire({
      title: `¿Deseas eliminar a ${estudiante.nombre}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteService.eliminar(estudiante.idPersona).subscribe(() => {
          this.dataSource = this.dataSource.filter(e => e.idPersona !== estudiante.idPersona);
        });

        Swal.fire({
          icon: 'success',
          title: 'Estudiante eliminado',
          text: 'El estudiante ha sido eliminado correctamente.',
          showConfirmButton: true
        });
      }
    });
  }

  abrirFormulario(estudiante: Estudiante | null = null) {
    const dialogRef = this.dialog.open(FormularioEstudianteComponent, {
      width: '400px',
      data: estudiante // 👈 pasar estudiante para edición, null para crear
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        if (estudiante) {
          // Edición
          this.estudianteService.actualizar(estudiante.idPersona, resultado).subscribe(() => {
            this.obtenerPagina(this.pageIndex, this.pageSize);
            Swal.fire({
              icon: 'success',
              title: 'Estudiante actualizado',
              text: 'Los cambios fueron guardados correctamente.',
              showConfirmButton: true
            });
          });
        } else {
          // Creación
          this.estudianteService.crear(resultado).subscribe(() => {
            this.obtenerPagina(this.pageIndex, this.pageSize);
            Swal.fire({
              icon: 'success',
              title: 'Estudiante creado',
              text: 'El estudiante fue registrado exitosamente.',
              showConfirmButton: true
            });
          });
        }
      }
    });
  }
}
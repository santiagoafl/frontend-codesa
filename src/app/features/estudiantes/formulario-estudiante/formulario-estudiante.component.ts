import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './formulario-estudiante.component.html',
  styleUrls: ['./formulario-estudiante.component.css']
})
export class FormularioEstudianteComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormularioEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: [data?.nombre || '', [Validators.required]],
      apellido: [data?.apellido || '', [Validators.required]],
      email: [data?.email || '', [Validators.required, Validators.email]],
      telefono: [data?.telefono || '', [Validators.required, Validators.pattern(/^\d+$/)]],
      grado: [data?.grado || '', [Validators.required, Validators.pattern(/^\d+$/)]],
      numeroMatricula: [data?.numeroMatricula || '', [Validators.required]],
      fechaNacimiento: [data?.fechaNacimiento || '', [Validators.required, this.fechaNoFuturaValidator]]
    });
  }

  fechaNoFuturaValidator(control: AbstractControl) {
    const valor = control.value;
    if (!valor) return null;
    const fecha = new Date(valor);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fecha > hoy ? { fechaFutura: true } : null;
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
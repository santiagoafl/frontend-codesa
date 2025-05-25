import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-profesor',
  standalone: true,
  templateUrl: './formulario-profesor.component.html',
  styleUrls: ['./formulario-profesor.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class FormularioProfesorComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormularioProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      apellido: [data?.apellido || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      telefono: [data?.telefono || '', [Validators.required, Validators.pattern(/^\d+$/)]],
      fechaNacimiento: [data?.fechaNacimiento || '', [
        Validators.required,
        this.fechaNoFuturaValidator
        
      ]],
      fechaContratacion: [data?.fechaContratacion || '', [
        Validators.required,
        this.fechaNoFuturaValidator
      ]],
      especialidad: [data?.especialidad || '', Validators.required],
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
  fechaNoFuturaValidator(control: AbstractControl) {
    const valor = control.value;
    if (!valor) return null;

    const fechaIngresada = new Date(valor);
    const hoy = new Date();

    return fechaIngresada > hoy ? { fechaFutura: true } : null;
  }

}
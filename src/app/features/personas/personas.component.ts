import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PersonaService } from '../../core/services/persona.service';
import { Persona } from '../../core/models/persona.model';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './personas.component.html'
})
export class PersonasComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono', 'fechaNacimiento', 'tipo'];
  dataSource: Persona[] = [];

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.personaService.listarTodas().subscribe(personas => {
      this.dataSource = personas;
    });
  }


}

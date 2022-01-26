import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { generoCreacionDTO } from '../generos';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  id;
  modelo: generoCreacionDTO = { nombre: 'Drama' }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.id = params.id)
  }


  guardarCambios(genero: generoCreacionDTO){

  }
}

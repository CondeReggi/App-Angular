import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  modelo: cineDTO = {
    nombre: "Movie Center"
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => console.log(params.id) )
  }

  guardarCambios(cine: cineCreacionDTO){
    console.log(cine);
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor() { }

  @Input()
  peliculas;

  ngOnInit(): void {

  }

  remover(indicePelicula: number) : void{
    // console.log("esto es e", e);
    // console.log("Hola, si puedo hacer console.log");
    this.peliculas.splice(indicePelicula, 1)
  }

}

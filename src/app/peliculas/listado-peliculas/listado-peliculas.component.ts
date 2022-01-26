import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor() {
  }

  @Input()
  peliculas = [];

  peliculasRated = [];



  ngOnInit(): void {
    // for (let i = 0; i < this.peliculas.length; i++) {
    //   this.peliculasRated[i] = null;
    // }
  }

  remover(indicePelicula: number): void {
    // console.log("esto es e", e);
    // console.log("Hola, si puedo hacer console.log");
    this.peliculas.splice(indicePelicula, 1)

    console.log(this.peliculasRated);
  }

  manejarVoto(voto: number, index: number): void {
    this.peliculasRated[index] = voto
  }

}

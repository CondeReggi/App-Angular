import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor(private peliculasServices: PeliculasService, private router: Router) {
  }

  @Input()
  peliculas = [];

  ngOnInit(): void {
    // for (let i = 0; i < this.peliculas.length; i++) {
    //   this.peliculasRated[i] = null;
    // }

    console.log(this.peliculas);
  }

  remover(indicePelicula: number): void {
    this.peliculasServices.borrarPelicula( indicePelicula ).subscribe( () => {
      window.location.reload();
    }, err => console.log(err))
  }

  manejarVoto(voto: number, index: number): void {
    // this.peliculasRated[index] = voto
  }

}

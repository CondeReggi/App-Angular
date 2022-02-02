import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { peliculaDTO } from '../peliculas/pelicula';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  peliculasEnCines: peliculaDTO[] = [];
  peliculasAEstrenar: peliculaDTO[] = [];
  peliculasAnteriores: peliculaDTO[] = [];

  constructor(private peliculasServices: PeliculasService, private router: Router){

  }

  ngOnInit(): void {
    this.peliculasServices.obtenerTodasLasPeliculas().subscribe(peliculas => {

      console.log(peliculas);

      this.peliculasEnCines = peliculas.enCines;
      this.peliculasAEstrenar = peliculas.proximosEstrenos;
      this.peliculasAnteriores = peliculas.anteriores;
    }, err => console.log(err))
  }

  borrarPelicula(id : number){
    this.peliculasServices.borrarPelicula(id)
  }

  title = 'front-end';
  ocultar = true;

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { peliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor(private peliculasService : PeliculasService, private router : Router) { }

  generosNoSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  errores:string[] = [];

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe( result => {

      this.generosNoSeleccionados = result.generos.map( genero => {
        return <MultipleSelectorModel>{
          llave: genero.id,
          valor: genero.nombre
        }
      })

      this.cinesNoSeleccionados = result.cines.map( cine => {
        return <MultipleSelectorModel>{
          llave: cine.id,
          valor: cine.nombre
        }
      })

    }, err => console.log(err))
  }

  guardarCambios(pelicula: peliculaCreacionDTO){
    // console.log(pelicula);

    console.log(pelicula);

    this.peliculasService.crear( pelicula )
      .subscribe( ( id: number ) => this.router.navigate(["/peliculas/" + id ]) ,
      err => this.errores = parsearErroresApi(err) )
  }

}

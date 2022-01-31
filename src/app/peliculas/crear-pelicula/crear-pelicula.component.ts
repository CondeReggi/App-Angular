import { Component, OnInit } from '@angular/core';
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

  constructor(private peliculasService : PeliculasService) { }

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
      .subscribe( () => console.log("Exitoso") ,
      err => this.errores = parsearErroresApi(err) )
  }

}

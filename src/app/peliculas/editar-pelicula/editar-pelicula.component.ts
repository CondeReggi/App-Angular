import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { peliculaCreacionDTO, peliculaDTO, peliculasPutGet } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private peliculasServices: PeliculasService, private router: Router) { }

  modelo: peliculaDTO;

  generosNoSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  generosSeleccionados: MultipleSelectorModel[] = [];
  cinesSeleccionados: MultipleSelectorModel[] = [];
  actoresSeleccionados: actorPeliculaDTO[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculasServices.obtenerGetPutId(params.id).subscribe(pelicula => {
        this.modelo = pelicula.pelicula;

        // console.log(pelicula);

        this.generosSeleccionados = pelicula.generosSeleccionados.map(genero => {
          return <MultipleSelectorModel>{
            llave: genero.id,
            valor: genero.nombre
          }
        });

        this.generosNoSeleccionados = pelicula.generosNoSeleccionados.map(genero => {
          return <MultipleSelectorModel>{
            llave: genero.id,
            valor: genero.nombre
          }
        });

        this.cinesSeleccionados = pelicula.cinesSeleccionados.map(cine => {
          return <MultipleSelectorModel>{
            llave: cine.id,
            valor: cine.nombre
          }
        })

        this.cinesNoSeleccionados = pelicula.cinesNoSeleccionados.map(cine => {
          return <MultipleSelectorModel>{
            llave: cine.id,
            valor: cine.nombre
          }
        })


        this.actoresSeleccionados = pelicula.actores.map( actor => {
          return <actorPeliculaDTO>{
            id: actor.id,
            nombre: actor.nombre,
            personaje: actor.personaje,
            foto: actor.foto
          }
        })

      }, err => console.log(err))
    })
  }

  guardarCambios(pelicula: peliculaCreacionDTO) {
    this.activatedRoute.params.subscribe( params => {
      console.log("es este" , pelicula);

      this.peliculasServices.editarPelicula( params.id , pelicula).subscribe( () => {
        this.router.navigate(["/"])
      }, err => console.log(err))
    })
  }

}

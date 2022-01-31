import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { peliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  modelo: peliculaDTO = {
    id: 1,
    titulo: 'Spider-Man' ,
    trailer: 'linkdeltrailer' ,
    enCines: true,
    resumen: 'Este es el resumen de la pelicula',
    fechaLanzamiento: new Date(),
    poster: 'https://depor.com/resizer/4cVE4BiAFEQ1L1hSDIzZJBmjTzc=/620x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/EQKCFNDARBBFFAQDIS4DNZTVGI.jpg',
    generos: [],
    actores: [],
    cines: []
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => console.log(params.id))
  }

  guardarCambios(pelicula: peliculaDTO){
    console.log(pelicula);
  }

}

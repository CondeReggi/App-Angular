import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CoordenadaConMensaje } from 'src/app/utilidades/mapa/coordenada';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { peliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-detalle-peliculas',
  templateUrl: './detalle-peliculas.component.html',
  styleUrls: ['./detalle-peliculas.component.css']
})
export class DetallePeliculasComponent implements OnInit {

  constructor(private peliculasService :  PeliculasService, private router: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  errores: string[] = [];
  pelicula: peliculaDTO;
  fechaLanzamiento: Date;
  trailerURL: SafeResourceUrl;
  coordenadas: CoordenadaConMensaje[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.peliculasService.obtenerPorId( params.id ).subscribe( pelicula => {

        console.log(pelicula);

        this.pelicula = pelicula;
        this.fechaLanzamiento = new Date(this.pelicula.fechaLanzamiento);
        this.trailerURL = this.generarURLYoutubeEmbed(this.pelicula.trailer);
        this.coordenadas = pelicula.cines.map( cine => {
          return {
            longitud: cine.longitud,
            latitud: cine.latitud,
            mensaje: cine.nombre
          }
        })

      }, err => this.errores = parsearErroresApi(err) )
    })
  }

  generarURLYoutubeEmbed(url: any): SafeResourceUrl{
    if (!url) {
      return '';
    }

    var video_id = url.split('v=')[1] // => _M8oalUyz10&ab_channel=CodelyTV-Redescubrelaprogramación
    var positionAmpersand = video_id.indexOf('&');

    if (positionAmpersand != -1){ // Si esta
      video_id = video_id.substring(0, positionAmpersand);
    }

    return this.sanitizer.bypassSecurityTrustUrl(`https://www.youtube.com/embed/${video_id}`)
  }

}

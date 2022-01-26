import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute) { }

  form: FormGroup;

  generos = [
    {
      id: 1,
      nombre: 'Drama'
    },
    {
      id: 2,
      nombre: 'Comedia'
    },
    {
      id: 3,
      nombre: 'Terror'
    }
  ]

  peliculas = [
    {
      titulo: 'Spider-Man',
      generos: [2],
      proximosEstrenos: true,
      enCines: false,
      poster: 'https://es.web.img2.acsta.net/pictures/22/01/03/13/22/5923305.jpg'
    },
    {
      titulo: 'Spider-Man 2',
      generos: [1],
      proximosEstrenos: false,
      enCines: true,
      poster: 'https://es.web.img2.acsta.net/pictures/22/01/03/13/22/5923305.jpg'
    },
    {
      titulo: 'Iron-Man 3',
      generos: [1],
      proximosEstrenos: false,
      enCines: false,
      poster: 'https://es.web.img2.acsta.net/pictures/22/01/03/13/22/5923305.jpg'
    }
  ]

  peliculasOriginal = this.peliculas;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: '',
      generoId: 0,
      proximosEstrenos: false,
      enCines: false
    })
    this.leerValoresURL()
    this.buscarPeliculas(this.form.value)

    this.form.valueChanges.subscribe( valores => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores)
      this.escribirParametrosDeBusqueda()
    } )
  }

  private escribirParametrosDeBusqueda(){
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if ( valoresFormulario.titulo ) {
      queryStrings.push( `titulo=${ valoresFormulario.titulo }` )
    }

    if ( valoresFormulario.generoId !== 0 ) {
      queryStrings.push( `generoId=${ valoresFormulario.generoId }` )
    }

    if ( valoresFormulario.proximosEstrenos ) {
      queryStrings.push( `proximosEstrenos=${ valoresFormulario.proximosEstrenos }` )
    }

    if ( valoresFormulario.enCines ) {
      queryStrings.push( `enCines=${ valoresFormulario.enCines }` )
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'))
  }

  private leerValoresURL() {
    this.activatedRoute.queryParams.subscribe( params => {
      var objeto: any = {};

      if ( params.titulo ){
        objeto.titulo = params.titulo;
      }

      if ( params.generoId ){
        objeto.generoId = Number(params.generoId);
      }

      if ( params.proximosEstrenos ){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if ( params.enCines ){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue( objeto )
    } )
  }

  buscarPeliculas(valores: any){
    const { titulo , generoId , proximosEstrenos , enCines } = valores;

    if ( titulo ) {
      this.peliculas = this.peliculas.filter( x => x.titulo.indexOf(titulo) !== -1 )
    }

    if ( generoId !== 0 ){
      this.peliculas = this.peliculas.filter( x => x.generos.indexOf(generoId))
    }

    if ( proximosEstrenos ) {
      this.peliculas = this.peliculas.filter( x => x.proximosEstrenos )
    }

    if ( proximosEstrenos ) {
      this.peliculas = this.peliculas.filter( x => x.proximosEstrenos )
    }

    if ( enCines ) {
      this.peliculas = this.peliculas.filter( x => x.enCines )
    }

    // this.peliculas = this.peliculas.filter( x => proximosEstrenos ? x.proximosEstrenos : !x.proximosEstrenos )
    // this.peliculas = this.peliculas.filter( x => enCines ? x.enCines : !x.enCines )

  }

  limpiar(){
    this.form.patchValue({
      titulo: '',
      generoId: 0,
      proximosEstrenos: false,
      enCines: false
    })
  }

}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { generoDTO } from 'src/app/generos/generos';
import { GenerosService } from 'src/app/generos/generos.service';
import { landingPageDTO, peliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private generosServices: GenerosService,
    private peliculasServices: PeliculasService
  ) { }

  form: FormGroup ;

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  generos: generoDTO[] = []
  peliculas: peliculaDTO[] = [];
  paginaActual = 1;
  cantidadElementosAMostrar = 10;
  cantidadElementos;

  ngOnInit(): void {
    this.generosServices.obtenerTodos().subscribe(generos => {

      this.generos = generos;

      this.form = this.formBuilder.group(this.formularioOriginal)
      this.leerValoresURL()
      this.buscarPeliculas(this.form.value)

      this.form.valueChanges.subscribe(valores => {
        this.buscarPeliculas(valores)
        this.escribirParametrosDeBusqueda()
      })

    }, err => console.log(err));

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
    valores.pagina = this.paginaActual;
    valores.RecordsPorPagina = this.cantidadElementosAMostrar;

    this.peliculasServices.filtrarPeliculas(valores).subscribe(peliculas => {

      this.peliculas = peliculas.body;
      this.escribirParametrosDeBusqueda();

    }, err => console.log(err))
  }

  limpiar(){
    this.form.patchValue({
      titulo: '',
      generoId: 0,
      proximosEstrenos: false,
      enCines: false
    })
  }

  // cargarRegistros(pagina: number, cantidadElementosAMostrar){
  //   this.seguridadServices.obtenerTodosLosUsuarios( pagina, cantidadElementosAMostrar ).subscribe((resp: HttpResponse<UsuarioDTO[]>) => {
  //     this.usuarios = resp.body;
  //     // console.log(resp.headers.get("cantidadTotalRegistros"));
  //     this.cantidadTotalRegistros = resp.headers.get("cantidadTotalRegistros");
  //   }, error => console.error(error));
  // }

  // actualizarPaginacion(datos: PageEvent){
  //   this.paginaActual = datos.pageIndex + 1;
  //   this.cantidadRegistrosAMostrar = datos.pageSize;
  //   this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
  // }

  paginatorUpdate( event: PageEvent ){
    this.paginaActual = event.pageIndex + 1;
    this.cantidadElementosAMostrar = event.pageSize;
    this.buscarPeliculas(this.form.value)
  }

}

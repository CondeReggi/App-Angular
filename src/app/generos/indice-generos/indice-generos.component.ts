import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { generoDTO } from '../generos';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  constructor(private generosService: GenerosService, private route: Router) { }

  generos: generoDTO[] = [];
  columnasAMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.generosService.obtenerTodos( pagina, cantidadElementosAMostrar ).subscribe((resp: HttpResponse<generoDTO[]>) => {
      this.generos = resp.body;

      // console.log(resp.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros = resp.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  borrarRegistroGenero(id: number){
    //Crear Metodo para borrar

    if (confirm("Estas seguro que deseas borrar")){
      this.generosService.borrarGeneroPorId( id ).subscribe( (data) => {
        this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
      }, (error) => {
        console.log(error);
      })
    }



  }

}

import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { cineDTO } from '../cine';
import { CineService } from '../cine.service';

@Component({
  selector: 'app-indice-cine',
  templateUrl: './indice-cine.component.html',
  styleUrls: ['./indice-cine.component.css']
})
export class IndiceCineComponent implements OnInit {

  constructor(private cinesServices: CineService, private route: Router) { }

  cines: cineDTO[] = [];
  columnasAMostrar = ['id','nombre','lugar','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.cinesServices.obtenerTodos( pagina, cantidadElementosAMostrar ).subscribe((resp: HttpResponse<cineDTO[]>) => {
      this.cines = resp.body;

      // console.log(resp.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros = resp.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  borrarRegistroCine(id: number){
    //Crear Metodo para borrar
    console.log(id);

    if (confirm("Estas seguro que deseas borrar")){
      this.cinesServices.borrarCinePorId( id ).subscribe( (data) => {
        this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
      }, (error) => {
        console.log(error);
      })
    }
  }
}

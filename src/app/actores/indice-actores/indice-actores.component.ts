import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { acotrDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  constructor(private actoresService: ActoresService, private route: Router) { }

  actores: acotrDTO[] = [];
  columnasAMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.actoresService.obtenerTodos( pagina, cantidadElementosAMostrar ).subscribe((resp: HttpResponse<acotrDTO[]>) => {
      this.actores = resp.body;

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
      this.actoresService.borrarActorPorId( id ).subscribe( (data) => {
        this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
      }, (error) => {
        console.log(error);
      })
    }



  }
}

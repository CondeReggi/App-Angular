import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css']
})
export class IndiceUsuariosComponent implements OnInit {

  usuarios: UsuarioDTO[] = [];
  cantidadTotalRegistros;
  paginaActual = 1;
  columnasAMostrar = ['id','email','acciones'];
  cantidadRegistrosAMostrar = 10;

  constructor(private seguridadServices: SeguridadService) { }

  ngOnInit(): void {
    this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  asignarAdmin(usuario: string){
    this.seguridadServices.hacerAdmin(usuario).subscribe(() => {
      console.log("Exito");
    }, err => console.log(err));
  }

  removerAdministrador(usuario: string){
    this.seguridadServices.removerAdmin(usuario).subscribe(() => {
      console.log("Exito");
    }, err => console.log(err));;
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.seguridadServices.obtenerTodosLosUsuarios( pagina, cantidadElementosAMostrar ).subscribe((resp: HttpResponse<UsuarioDTO[]>) => {
      this.usuarios = resp.body;
      // console.log(resp.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros = resp.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  //------------------------------------------------------------
    // borrarRegistroGenero(id: number){
    //Crear Metodo para borrar

    // if (confirm("Estas seguro que deseas borrar")){
    //   this.generosService.borrarGeneroPorId( id ).subscribe( (data) => {
    //     this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
    //   }, (error) => {
    //     console.log(error);
    //   })
    // }
}

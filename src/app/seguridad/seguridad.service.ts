import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { credencialesUsuario, respuestaAutenticacion } from './seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private http: HttpClient) { }

  rolUsuario: string = "admin";
  rolDefault: string = "admin";
  apiUrl = environment.apiURL + "cuentas";

  private readonly llaveToken = "token";
  private readonly llaveExpiracion = "token-expiracion"

  estaLogeado(rol: string): boolean{
    const token = localStorage.getItem(this.llaveToken);
    if(!token){
      return false;
    }
    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const fecha = new Date(expiracion);
    if( fecha < new Date() ){
      this.logOut();
      return false;
    }
    return true;
  }

  obtenerRol(): string{
    return this.rolUsuario ? this.rolUsuario : this.rolDefault;
  }

  obtenerCampoJWT(campo: string): string{
    const token = localStorage.getItem(this.llaveToken);

    if(!token){
      return '';
    }

    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo].split('@')[0];
  }

  logOut(){
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  registrarUsuario( credencial: credencialesUsuario ): Observable<respuestaAutenticacion>{
    return this.http.post<respuestaAutenticacion>(`${this.apiUrl}/crear`, credencial);
  }

  loginUsuario( credencial: credencialesUsuario ): Observable<respuestaAutenticacion>{
    return this.http.post<respuestaAutenticacion>(`${this.apiUrl}/login`, credencial);
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion){
    //Utilizacion de Local Storage
    localStorage.setItem( this.llaveToken , respuestaAutenticacion.token );
    localStorage.setItem( this.llaveExpiracion , respuestaAutenticacion.expiracion.toString() );
  }

}

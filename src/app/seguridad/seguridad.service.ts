import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { credencialesUsuario, respuestaAutenticacion, UsuarioDTO } from './seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiURL + "cuentas";

  private readonly llaveToken = "token";
  private readonly llaveExpiracion = "token-expiracion"
  private readonly campoRol = 'role';

  estaLogeado(): boolean{
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

  obtenerToken(): string{
    return localStorage.getItem(this.llaveToken);
  }

  obtenerTodosLosUsuarios(pagina: number, recordsPorPagina: number): Observable<any>{
    let params = new HttpParams();
    params = params.append("pagina", pagina.toString());
    params = params.append("recordsPorPagina", recordsPorPagina.toString());

    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/listadoUsuarios`, { observe: 'response',  params} );
  }

  hacerAdmin(usuario: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiUrl}/HacerAdmin`, JSON.stringify(usuario), {headers});
  }

  removerAdmin(usuario: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiUrl}/HacerAdmin`, JSON.stringify(usuario), {headers});
  }

  obtenerRol(): string{
    console.log("hola" , this.campoRol , this.obtenerCampoJWT(this.campoRol));
    return this.obtenerCampoJWT(this.campoRol);
  }

  obtenerCampoJWT(campo: string): string{
    const token = localStorage.getItem(this.llaveToken);
    if (!token){return '';}
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    var mail = dataToken[campo];


    // console.log( JSON.parse(atob(token.split('.')[1])) , campo, dataToken["rol"]);
    // console.log(typeof(mail) , mail.toString().indexOf('@'));

    return mail;

    // var indexArroba = mail.indexOf('@');
    // return mail.substring(0, indexArroba);
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

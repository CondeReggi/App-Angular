import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoCreacionDTO, generoDTO } from './generos';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(private http: HttpClient) { // Con el modulo HTTP se va a poder hacer consultas http (hay que configurar el cors igual creo)

  }

  private apiURL = environment.apiURL + 'Generos';

  public obtenerPaginado(pagina: number, elementosAMostrar: number): Observable<any>{

    let params = new HttpParams();

    params = params.append('pagina', pagina.toString());
    params = params.append('RecordsPorPagina' , elementosAMostrar.toString())
    // return [{ id: 1, nombre: 'Drama' }]
    return this.http.get<generoDTO[]>(this.apiURL, { observe: 'response' , params: params });
    // this.http.get<generoDTO[]>( this.apiURL ).subscribe(prop => {console.log(prop)}, error => console.error(error));
  }

  public obtenerTodos(): Observable<any>{
    return this.http.get<generoDTO[]>(this.apiURL + "/todos");
  }

  public postearGenero(generoCreacion: generoCreacionDTO){
    // alert("entre")
    return this.http.post( this.apiURL , generoCreacion )
  }

  public obtenerPorId(id: number): Observable<generoDTO>{
    return this.http.get<generoDTO>( this.apiURL + '/' + id )
  }

  public editarGeneroPorId(id: number , generoCreacion: generoCreacionDTO){
    return this.http.put(`${this.apiURL}/${id}` , generoCreacion );
  }

  public borrarGeneroPorId(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}

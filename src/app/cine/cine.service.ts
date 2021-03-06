import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineCreacionDTO, cineDTO } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CineService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + "cines";

  crearCine(cine: cineCreacionDTO)
  {
    return this.http.post(this.apiURL, cine);
  }

  obtenerPorId( id: number ): Observable<cineDTO>
  {
    return this.http.get<cineDTO>(`${this.apiURL}/${id}`);
  }

  obtenerTodos(pagina: number , cantidadElementosAMostrar: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina' , cantidadElementosAMostrar.toString());

    return this.http.get<cineDTO>(this.apiURL, {
      observe: 'response',
      params
    })
  }

  editarCine( id: number, cineCreacion : cineCreacionDTO ){
    return this.http.put(`${this.apiURL}/${id}` , cineCreacion);
  }

  borrarCinePorId(id: number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }
}

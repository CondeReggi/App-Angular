import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { acotrDTO, actorCreacionDTO, actorPeliculaDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private apiURL = environment.apiURL + 'actores';

  constructor(private http: HttpClient) {

  }

  public obtenerPorNombre(nombre: string): Observable<actorPeliculaDTO[]>{
    const headers = new HttpHeaders('Content-Type: application/json');

    return this.http.post<actorPeliculaDTO[]>(`${this.apiURL}/buscarPorNombre` , JSON.stringify(nombre) , {headers});
  }

  public obtenerTodos( pagina: number, cantidadElementosAMostrar: number ): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina' , cantidadElementosAMostrar.toString());

    return this.http.get<acotrDTO>(this.apiURL, {
      observe: 'response',
      params
    })
  }

  public obtenerActorPorId( id: number ): Observable<acotrDTO>{
    return this.http.get<acotrDTO>(`${this.apiURL}/${id}`)
  }

  public crearActor(actor: actorCreacionDTO){
    const formData = this.construirFormData(actor);
    // console.log("actor desde crearActor" , actor);
    return this.http.post(this.apiURL, formData);
  }

  public editarActor(id: number, actor: actorCreacionDTO){

    console.log("desde editar" , actor);

    const formData = this.construirFormData(actor);
    // console.log("actor desde crearActor" , actor);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  private construirFormData(actor: actorCreacionDTO): FormData{
    // console.log("desde formdata funcion" , actor);
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia){
      formData.append('biografia', actor.biografia);
    }
    if (actor.fechaNacimiento) {
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento))
    }
    console.log("tiene: " , formData.has('biografia'));

    if (actor.foto){
      formData.append('foto', actor.foto)
    }
    console.log(formData);
    return formData;
  }

  public borrarActorPorId(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}

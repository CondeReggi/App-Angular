import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { landingPageDTO, peliculaCreacionDTO, peliculaDTO, peliculaPostGet, peliculasPutGet } from './pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiURL + 'peliculas';

  public filtrarPeliculas( valores: any ): Observable<any> {
    const params = new HttpParams({ fromObject: valores })

    return this.http.get<peliculaDTO[]>( `${this.apiUrl}/filtrar` , { params, observe: 'response' } );
  }

  public postGet(): Observable<peliculaPostGet>
  {
    return this.http.get<peliculaPostGet>(`${this.apiUrl}/PostGet`)
  }

  public obtenerPorId(id: number): Observable<peliculaDTO>
  {
    return this.http.get<peliculaDTO>(`${this.apiUrl}/${id}`);
  }

  public obtenerTodasLasPeliculas(): Observable<landingPageDTO>{
    return this.http.get<landingPageDTO>(this.apiUrl);
  }

  public crear (pelicula: peliculaCreacionDTO): Observable<number>{
    const formData = this.ConstruirFormData(pelicula);
    // console.log("pelicula desde crear" , pelicula);
    return this.http.post<number>(this.apiUrl , formData);
  }

  public borrarPelicula(id: number){
    console.log("entre al borrado");
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public obtenerGetPutId(id: number): Observable<peliculasPutGet>{
    return this.http.get<peliculasPutGet>(`${this.apiUrl}/GetPut/${id}`);
  }

  public editarPelicula(id: number, pelicula: peliculaCreacionDTO): Observable<any>{

    // console.log(pelicula);
    const formData = this.ConstruirFormData(pelicula);
    // console.log("pelicula desde crear" , pelicula);
    return this.http.put(`${this.apiUrl}/${id}` , formData);
  }

  private ConstruirFormData(pelicula: peliculaCreacionDTO): FormData{
    const formData = new FormData()
    formData.append('titulo', pelicula.titulo);
    formData.append('resumen', pelicula.resumen);
    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));

    //A vos te parece esto

    if(pelicula.FechLanzamiento){
      formData.append('fechLanzamiento', formatearFecha(pelicula.FechLanzamiento));

      console.log(pelicula.FechLanzamiento , formatearFecha(pelicula.FechLanzamiento));
    }

    if(pelicula.poster){
      formData.append('poster', pelicula.poster);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds' , JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    // console.log(formData.get("fechLanzamiento"));

    return formData;
  }
}

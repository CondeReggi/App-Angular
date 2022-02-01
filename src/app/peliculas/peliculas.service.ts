import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { peliculaCreacionDTO, peliculaDTO, peliculaPostGet } from './pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiURL + 'peliculas';

  public postGet(): Observable<peliculaPostGet>
  {
    return this.http.get<peliculaPostGet>(`${this.apiUrl}/PostGet`)
  }

  public obtenerPorId(id: number): Observable<peliculaDTO>
  {
    return this.http.get<peliculaDTO>(`${this.apiUrl}/${id}`);
  }

  public crear (pelicula: peliculaCreacionDTO): Observable<number>{
    const formData = this.ConstruirFormData(pelicula);
    // console.log("pelicula desde crear" , pelicula);
    return this.http.post<number>(this.apiUrl , formData);
  }

  private ConstruirFormData(pelicula: peliculaCreacionDTO): FormData{
    const formData = new FormData()
    formData.append('titulo', pelicula.titulo);
    formData.append('resumen', pelicula.resumen);
    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));

    //A vos te parece esto

    if(pelicula.fechaLanzamiento){
      formData.append('fechaEstreno', formatearFecha(pelicula.fechaLanzamiento));
    }

    if(pelicula.poster){
      formData.append('poster', pelicula.poster);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds' , JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));
    return formData;
  }
}

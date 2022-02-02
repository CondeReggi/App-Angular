import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { landingPageDTO, peliculaCreacionDTO, peliculaDTO, peliculaPostGet } from './pelicula';

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

  public obtenerTodasLasPeliculas(): Observable<landingPageDTO>{
    return this.http.get<landingPageDTO>(this.apiUrl);
  }

  public crear (pelicula: peliculaCreacionDTO): Observable<number>{
    const formData = this.ConstruirFormData(pelicula);
    // console.log("pelicula desde crear" , pelicula);
    return this.http.post<number>(this.apiUrl , formData);
  }

  public borrarPelicula(id: number) {
    console.log("entre al borrado");
    return this.http.delete(`${this.apiUrl}/${id}`);
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

    console.log(formData.get("fechLanzamiento"));

    return formData;
  }
}

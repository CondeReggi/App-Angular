import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  apiUrl = environment.apiURL + "rating"

  constructor(private http: HttpClient) { }

  enviarRating(peliculaId: number,  puntuacion: number){
    return this.http.post(this.apiUrl, { peliculaId, puntuacion });
  }
}

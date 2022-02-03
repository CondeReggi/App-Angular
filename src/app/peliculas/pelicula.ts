import { actorPeliculaDTO } from "../actores/actor";
import { cineDTO } from "../cine/cine";
import { generoDTO } from "../generos/generos";

export interface peliculaCreacionDTO{
  titulo: string;
  resumen: string;
  enCines: boolean;
  FechLanzamiento: Date;
  trailer: string;
  poster: File;
  generosIds: number[];
  actores: actorPeliculaDTO[];
  cinesIds: number[];
}

export interface peliculaDTO {
  id: number;
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechLanzamiento: Date;
  trailer: string;
  poster: string;
  generos: generoDTO[];
  actores: actorPeliculaDTO[];
  cines: cineDTO[];
  votoUsuario: number;
  promedioVoto: number;
}

export interface peliculaPostGet {
  generos: generoDTO[];
  cines: cineDTO[];
}

export interface landingPageDTO {
  enCines: peliculaDTO[];
  proximosEstrenos: peliculaDTO[];
  anteriores: peliculaDTO[];
}

export interface peliculasPutGet {
  pelicula: peliculaDTO;
  generosSeleccionados: generoDTO[];
  generosNoSeleccionados: generoDTO[];
  cinesSeleccionados: cineDTO[];
  cinesNoSeleccionados: cineDTO[];
  actores: actorPeliculaDTO[];
}

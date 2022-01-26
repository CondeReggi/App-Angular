import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearActoreComponent } from './actores/crear-actore/crear-actore.component';
import { EditarActorComponent } from './actores/editar-actor/editar-actor.component';
import { IndiceActoresComponent } from './actores/indice-actores/indice-actores.component';
import { CrearCineComponent } from './cine/crear-cine/crear-cine.component';
import { IndiceCineComponent } from './cine/indice-cine/indice-cine.component';
import { EditarCineComponent } from './cine/editar-cine/editar-cine.component';
import { CrearGenerosComponent } from './generos/crear-generos/crear-generos.component';
import { EditarGeneroComponent } from './generos/editar-genero/editar-genero.component';
import { IndiceGenerosComponent } from './generos/indice-generos/indice-generos.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CrearPeliculaComponent } from './peliculas/crear-pelicula/crear-pelicula.component';
import { EditarPeliculaComponent } from './peliculas/editar-pelicula/editar-pelicula.component';
import { FiltroPeliculasComponent } from './peliculas/filtro-peliculas/filtro-peliculas.component';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "generos",
    component: IndiceGenerosComponent
  },
  {
    path: "generos/crear",
    component: CrearGenerosComponent
  },
  {
    path: "actores",
    component: IndiceActoresComponent
  },
  {
    path: "actores/crear",
    component: CrearActoreComponent
  },
  {
    path: "cines",
    component: IndiceCineComponent
  },
  {
    path: "cines/crear",
    component: CrearCineComponent
  },
  {
    path: "peliculas/crear",
    component: CrearPeliculaComponent
  },
  {
    path: "actores/editar/:id",
    component: EditarActorComponent
  },
  {
    path: "peliculas/editar/:id",
    component: EditarPeliculaComponent
  },
  {
    path: "generos/editar/:id",
    component: EditarGeneroComponent
  },
  {
    path: "cines/editar/:id",
    component: EditarCineComponent
  },
  {
    path: "peliculas/buscar",
    component: FiltroPeliculasComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

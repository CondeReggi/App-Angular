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
import { DetallePeliculasComponent } from './peliculas/detalle-peliculas/detalle-peliculas.component';
import { EsAdminGuard } from './es-admin.guard';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { style } from '@angular/animations';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "generos",
    component: IndiceGenerosComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "generos/crear",
    component: CrearGenerosComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "actores",
    component: IndiceActoresComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "actores/crear",
    component: CrearActoreComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "cines",
    component: IndiceCineComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "cines/crear",
    component: CrearCineComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "peliculas/crear",
    component: CrearPeliculaComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "actores/editar/:id",
    component: EditarActorComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "peliculas/editar/:id",
    component: EditarPeliculaComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "generos/editar/:id",
    component: EditarGeneroComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "cines/editar/:id",
    component: EditarCineComponent,
    canActivate: [EsAdminGuard]
  },
  {
    path: "peliculas/buscar",
    component: FiltroPeliculasComponent
  },
  {
    path: "peliculas/:id",
    component: DetallePeliculasComponent
  },
  {
    path: "login",
    component: RegistroComponent
  },
  {
    path: "registro",
    component: LoginComponent
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

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EsAdminGuard implements CanActivate {

  constructor(private seguridadService: SeguridadService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log("estoy aca adentro, y mi rol es:", this.seguridadService.obtenerRol());

    if (this.seguridadService.obtenerRol() === 'admin') {
      // console.log("entre");
      return true;
    }

    this.router.navigate(['/login'])
    return false;
  }

}

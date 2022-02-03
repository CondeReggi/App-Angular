import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { credencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  errores: string[] = [];
  accion: string = "Login"

  constructor(private seguridadServices: SeguridadService, private router: Router) { }

  ngOnInit(): void {
  }

  logear(credenciales: credencialesUsuario){
    this.seguridadServices.loginUsuario(credenciales).subscribe( exitoso => {
      this.seguridadServices.guardarToken( exitoso );
      this.router.navigate(["/"]);
    }, err => this.errores = parsearErroresApi(err) )
  }
}

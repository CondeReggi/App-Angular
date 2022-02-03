import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { credencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errores: string[] = [];
  accion: string = 'Registro'

  constructor(private seguridadServices: SeguridadService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(credenciales: credencialesUsuario){
    this.seguridadServices.registrarUsuario(credenciales).subscribe( token => {
      this.seguridadServices.guardarToken( token );
      this.router.navigate(["/"])
    }, err => this.errores = parsearErroresApi(err))
  }

}

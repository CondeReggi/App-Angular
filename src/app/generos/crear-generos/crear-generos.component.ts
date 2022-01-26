import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../generos';

@Component({
  selector: 'app-crear-generos',
  templateUrl: './crear-generos.component.html',
  styleUrls: ['./crear-generos.component.css']
})
export class CrearGenerosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void{

  }

  guardarCambios(genero: generoCreacionDTO){
    alert("cambios guardados: " + genero.nombre);

    this.router.navigate( //useHistory similar
      ["/generos"]
    )
  }

}

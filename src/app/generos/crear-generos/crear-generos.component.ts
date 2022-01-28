import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../generos';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-crear-generos',
  templateUrl: './crear-generos.component.html',
  styleUrls: ['./crear-generos.component.css']
})
export class CrearGenerosComponent implements OnInit {

  constructor(private router: Router , private generosServices: GenerosService ) { }

  ngOnInit(): void{
  }

  @Output()
  errores: string[] = []

  guardarCambios(genero: generoCreacionDTO){
    // alert("cambios guardados: " + genero.nombre);

    this.generosServices.postearGenero( genero ).subscribe( (e) => {
      this.router.navigate( //useHistory similar
        ["/generos"]
      )
    }, err => {
      // console.log(err);

      // this.errores = err.error.errors.Nombre;
      // console.log(this.errores);
      this.errores = parsearErroresApi(err)

      // console.log(this.errores);
    } )

  }

}

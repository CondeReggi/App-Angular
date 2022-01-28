import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../generos';

@Component({
  selector: 'app-formulario-generos',
  templateUrl: './formulario-generos.component.html',
  styleUrls: ['./formulario-generos.component.css']
})
export class FormularioGenerosComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  form: FormGroup; // Grupo de datos con sus configuraciones
  @Output()
  onSubmit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();

  @Input()
  modelo: generoCreacionDTO;

  ngOnInit(): void {
    this.form = this.formBuilder.group({ // Crea un objeto con valores iniciales para el formulario
      nombre: [
        "", {
          validators: [ Validators.required , Validators.maxLength(120) , Validators.minLength(6) /* , primeraLetraMayuscula()  */ ]
        }
      ]
    })

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  @Input()
  @Output()
  errores: string[] = [];

  guardarCambios(){
    this.onSubmit.emit(this.form.value)
  }

  obtenerErrorCampoNombre(){
    let campo = this.form.get('nombre'); // Obtengo el campo nombre del form
    if ( campo.hasError('required') ){
      return 'El campo nombre es requerido'
    }

    if( campo.hasError('minlength') ){
      return 'El campo nombre tiene que tener almenos 6 caracteres'
    }

    if( campo.hasError('primeraLetraMayuscula') ){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    // if ( this.errores.length > 0 ){
    //   return this.errores.join(" , ");
    // }

    return ''
  }
}

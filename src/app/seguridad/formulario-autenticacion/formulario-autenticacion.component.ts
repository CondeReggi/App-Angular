import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from '../seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.css']
})
export class FormularioAutenticacionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input() errores: string[] = [];
  @Input() accion: string;

  @Output()
  onSubmit: EventEmitter<credencialesUsuario> = new EventEmitter<credencialesUsuario>();

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required , Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    })
  }

  obtenerMensajeErrorEmail(){
    var campo = this.form.get("email");

    if(campo.hasError('required')){
      return "El campo email es requerido"
    }
    if(campo.hasError('email')){
      return "El campo email es un mail valido"
    }

    return '';
  }

}

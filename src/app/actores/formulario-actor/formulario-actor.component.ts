import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { acotrDTO, actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-formulario-actor',
  templateUrl: './formulario-actor.component.html',
  styleUrls: ['./formulario-actor.component.css']
})
export class FormularioActorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup

  @Input()
  modelo: acotrDTO;

  @Input()
  errores: string[] = [];

  @Output()
  onSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',{
        validators: [Validators.required , Validators.maxLength(120) , Validators.minLength(6) , primeraLetraMayuscula()]
      }],
      fechaNacimiento: '',
      foto: '',
      biografia: ''
    })

    if ( this.modelo !== undefined ){
      this.form.patchValue( this.modelo )
    }
  }

  archivoSeleccionado(file){
    console.log("hola" , file);
    this.form.get('foto').setValue(file)
  }

  submit(){
    this.onSubmit.emit(this.form.value);
  }

  cambioMarkdown(texto){
    this.form.get('biografia').setValue(texto);
  }
}

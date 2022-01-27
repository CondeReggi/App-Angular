import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { peliculaCreacionDTO, peliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-peliculas',
  templateUrl: './formulario-peliculas.component.html',
  styleUrls: ['./formulario-peliculas.component.css']
})
export class FormularioPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup

  @Input()
  modelo: peliculaDTO;

  @Output()
  OnSubmit: EventEmitter<peliculaCreacionDTO> = new EventEmitter<peliculaCreacionDTO>();


  generosNoSeleccionados: MultipleSelectorModel[] = [
    {llave: 1, valor: 'Terror'},
    {llave: 2, valor: 'Comedia'},
    {llave: 3, valor: 'Aventuras'},
    {llave: 4, valor: 'Accion'},
    {llave: 5, valor: 'Ciencia Ficcion'}
  ]

  generosSeleccionados: MultipleSelectorModel[] = []

  cinesSeleccionados: MultipleSelectorModel[] = []

  cinesNoSeleccionados: MultipleSelectorModel[] = [
    {llave: 1, valor: 'Movie Center'},
    {llave: 2, valor: 'TiendASDSAD'},
    {llave: 3, valor: 'AventuraspEPE'},
    {llave: 4, valor: 'PanchoVA!'},
  ]

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [ ''  , { validators: [Validators.required , Validators.maxLength(150)] } ],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosId: '',
      cinesId: ''
    })

    if (this.modelo !== undefined){
      this.form.patchValue( this.modelo )
    }
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo)
  }

  changeMarkDown(resumen: string){
    this.form.get('resumen').setValue(resumen);
  }

  guardarCambios(){
    this.form.get('generosId').setValue( this.generosSeleccionados.map( valor => valor.llave ) )
    this.form.get('cinesId').setValue( this.cinesSeleccionados.map( valor => valor.llave ) )
    this.OnSubmit.emit(this.form.value); // Enviar informacion de la pelicula
  }
}

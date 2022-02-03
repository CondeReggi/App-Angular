import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { peliculaCreacionDTO, peliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-peliculas',
  templateUrl: './formulario-peliculas.component.html',
  styleUrls: ['./formulario-peliculas.component.css']
})
export class FormularioPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  imagenCambiada = false;

  form: FormGroup
  @Input()
  errores: string[] = [];
  @Input()
  modelo: peliculaDTO;

  @Input()
  generosNoSeleccionados: MultipleSelectorModel[];
  @Input()
  cinesNoSeleccionados: MultipleSelectorModel[];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  @Output()
  OnSubmit: EventEmitter<peliculaCreacionDTO> = new EventEmitter<peliculaCreacionDTO>();

  @Input()
  generosSeleccionados: MultipleSelectorModel[] = [];
  @Input()
  cinesSeleccionados: MultipleSelectorModel[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [ ''  , { validators: [Validators.required , Validators.maxLength(150)] } ],
      resumen: '',
      enCines: false,
      trailer: '',
      FechLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    })

    if (this.modelo !== undefined){
      this.form.patchValue( this.modelo )
    }

    console.log(this.modelo , this.form);
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

  changeMarkDown(resumen: string){
    this.form.get('resumen').setValue(resumen);
  }

  guardarCambios(){
    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosIds').setValue(generosIds);

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesIds').setValue(cinesIds);

    const actores = this.actoresSeleccionados.map( valor => {
      return {
        id: valor.id,
        personaje: valor.personaje
      }
    })
    this.form.get('actores').setValue(actores);

    // console.log(generosIds ,cinesIds, actores );
    if (!this.imagenCambiada){
      this.form.patchValue({'poster': null});
    }

    this.OnSubmit.emit(this.form.value); // Enviar informacion de la pelicula

  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  constructor() { }

  imagenBase64: string;

  @Input() //Pára poder recibir parametros => se usa [propiedad]
  urlImagenActual: string;

  @Output() //Para poder enviar parametros => se usa (propiedad)
  archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();

  ngOnInit(): void {
  }

  change(event){
    if ( event.target.files.length > 0 ){
      const file: File = event.target.files[0];
      toBase64( file ).then((value: string) => this.imagenBase64 = value)
                      .catch(err => console.log(err))

      this.archivoSeleccionado.emit(file);

      this.urlImagenActual = null //Porque selecciona y entonces como urlImagenActual se renderiza porque existe en el *ngIf AHORA YA NO LO HARÁ
    }
  }
}

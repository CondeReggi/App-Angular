import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from './MultipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  constructor() { }

  @Input()
  Seleccionados: MultipleSelectorModel[] = []

  @Input()
  NoSeleccionados: MultipleSelectorModel[] = []

  ngOnInit(): void {
  }

  seleccionar(item: MultipleSelectorModel, index: number){
    this.Seleccionados.push(item)
    this.NoSeleccionados.splice(index, 1);
  }

  deseleccionar(item: MultipleSelectorModel, index: number){
    this.NoSeleccionados.push(item)
    this.Seleccionados.splice(index, 1);
  }

  seleccionarTodos(){
    this.Seleccionados.push( ...this.NoSeleccionados ) // Arrastro todos los items
    this.NoSeleccionados = []
  }

  deseleccionarTodos(){
    this.NoSeleccionados.push( ...this.Seleccionados )
    this.Seleccionados = []
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  constructor() { }

  @Input()
  tipo: string;

  @Output()
  onChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  contenidoMarkdown = '';

  ngOnInit(): void {
  }

  inputTextArea(texto : string){
    // console.log(texto);
    this.contenidoMarkdown = texto
    this.onChange.emit(texto);
  }

}

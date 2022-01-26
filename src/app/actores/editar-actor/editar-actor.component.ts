import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { acotrDTO, actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  modelo: acotrDTO = {
    nombre: 'felipe',
    fechaNacimiento: new Date(),
    foto: 'https://m.media-amazon.com/images/I/51gIHXVvMDL._AC_.jpg'
    // biografia: 'Esto es una biografia'
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => console.log(params))
  }

  guardarCambios(actor: actorCreacionDTO){
    console.log(actor);
  }

}

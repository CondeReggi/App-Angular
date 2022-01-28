import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-crear-actore',
  templateUrl: './crear-actore.component.html',
  styleUrls: ['./crear-actore.component.css']
})
export class CrearActoreComponent implements OnInit {

  constructor(private route: Router, private actoresServices: ActoresService) { }

  // @Input()
  // modelo: actorCreacionDTO;

  ngOnInit(): void {
  }

  errores = [];

  guardarCambios(actor: actorCreacionDTO){
    // .... /
    console.log(actor);

    this.actoresServices.crearActor(actor).subscribe( () => {
      this.route.navigate(["/actores"])
    }, err => this.errores = parsearErroresApi(err) )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO } from '../cine';
import { CineService } from '../cine.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent implements OnInit {

  constructor(private route: Router, private cinesServices: CineService) { }

  // @Input()
  // modelo: actorCreacionDTO;

  ngOnInit(): void {
  }

  errores = [];

  guardarCambios(actor: cineCreacionDTO){
    // .... /
    console.log(actor);

    this.cinesServices.crearCine(actor).subscribe( () => {
      this.route.navigate(["/cines"])
    }, err => this.errores = parsearErroresApi(err) )
  }
}

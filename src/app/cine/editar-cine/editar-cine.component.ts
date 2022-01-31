import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cineCreacionDTO, cineDTO } from '../cine';
import { CineService } from '../cine.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cinesServices: CineService, private router: Router) { }

  modelo: cineDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      //Aca tengo el params.id que es el id del url
      this.cinesServices.obtenerPorId( params.id ).subscribe( cine => {
        this.modelo = cine;
        console.log(this.modelo);
      });
    }, err => this.router.navigate(["/cines"]) )
  }

  guardarCambios(cine: cineCreacionDTO){
    this.cinesServices.editarCine( this.modelo.id , cine ).subscribe( cine => {
      this.router.navigate(["/cines"])
    }, err => this.router.navigate(["/cines"]) )
  }

}

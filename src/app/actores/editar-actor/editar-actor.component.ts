import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { acotrDTO, actorCreacionDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private actoresServices: ActoresService, private router: Router) { }

  modelo: acotrDTO;

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => console.log(params))
    this.activatedRoute.params.subscribe(params => {
      this.actoresServices.obtenerActorPorId(params.id).subscribe(actor => this.modelo = actor)
    }, (error) => {
      this.router.navigate(['/generos'])
    })
  }

  guardarCambios(actor: actorCreacionDTO){
    this.activatedRoute.params.subscribe(params => {
      this.actoresServices.editarActor(params.id , actor).subscribe( () => {
        this.router.navigate(["/actores"])
      })
    }, (error) => {
      this.router.navigate(['/actores'])
    })
  }
}

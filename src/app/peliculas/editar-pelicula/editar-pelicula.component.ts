import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { peliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  modelo: peliculaDTO;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => console.log(params.id))
  }

  guardarCambios(pelicula: peliculaDTO){
    console.log(pelicula);
  }

}

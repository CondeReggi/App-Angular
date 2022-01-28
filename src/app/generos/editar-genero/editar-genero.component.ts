import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO, generoDTO } from '../generos';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private generosService: GenerosService, private router: Router) { }

  id;
  modelo: generoDTO;
  @Output()
  errores: string[] = []

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.generosService.obtenerPorId(params.id).subscribe(genero => this.modelo = genero)
    }, (error) => {
      this.router.navigate(['/generos'])
    })
  }


  guardarCambios(genero: generoCreacionDTO){
    console.log(genero);

    this.activatedRoute.params.subscribe(params => {
      this.generosService.editarGeneroPorId(params.id , genero).subscribe(() => {
        this.router.navigate(['/generos'])
      }, (err) => {
        this.errores = parsearErroresApi(err)
      })
    }, (error) => {
      this.router.navigate(['/generos'])
    })
  }
}

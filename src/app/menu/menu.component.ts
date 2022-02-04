import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad/seguridad.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) { }

  nombre: string = this.seguridadService.obtenerCampoJWT('email');

  ngOnInit(): void {
    // console.log(this.seguridadService.obtenerCampoJWT('email'));
  }

  logOut(){
    this.seguridadService.logOut()
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.peliculasEnCines = [{
        nombre: "Spider-Man",
        fecha: new Date()
      },
      {
        nombre: "Spider-Man 2",
        fecha: new Date()
      }]

      this.peliculasAEstrenar = [{
        nombre: "Spider-Man No Way Home",
        fecha: new Date()
      }, {
        nombre: "Señor de los Anillos",
        fecha: new Date()
      }]
    }, 850);
  }

  title = 'front-end';


  peliculasEnCines;
  peliculasAEstrenar;
}

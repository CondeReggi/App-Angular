import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LeafletMouseEvent, tileLayer, latLng, Marker, marker, icon } from 'leaflet'
import { Coordenada, CoordenadaConMensaje } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }


  @Input()
  coordenadasIniciales: CoordenadaConMensaje[] = [];
  @Input()
  soloLectura: boolean = false;

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map(valor => {
      let marcador = marker([valor.latitud, valor.longitud], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          // shadowRetinaUrl:'marker-icon-2x.png',
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      });

      if (valor.mensaje){
        marcador.bindPopup(valor.mensaje, {
          autoClose: false, autoPan: false
        })
      }

      return marcador;
    })
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(-34.890917, -56.179906)
  };

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent) {
    if (!this.soloLectura) {
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;

      // console.log(latitud, longitud);
      this.capas = [] //Para un marcador a la vez, no muchos
      this.capas.push(marker([latitud, longitud], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          // shadowRetinaUrl:'marker-icon-2x.png',
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }))
      this.coordenadaSeleccionada.emit({
        latitud: latitud,
        longitud: longitud
      })
    }
  }
}

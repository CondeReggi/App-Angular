import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styleUrls: ['./ciclo-de-vida.component.css']
})
export class CicloDeVidaComponent implements OnInit , OnChanges , OnDestroy , DoCheck , AfterViewInit {

  @Input()
  titulo: string;

  interval: ReturnType<typeof setInterval>;

  @ViewChild(RatingComponent)
  ratingComponent: RatingComponent;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("on Changes");
  }
  ngOnDestroy(): void {
    console.log("on Destroy");
    clearInterval(this.interval)
  }
  ngDoCheck(): void {
    console.log("Do check");
  }
  ngAfterViewInit(): void {
    console.log("After view");
    this.ratingComponent.ratingSeleccionado = 3;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    console.log("onInit");
    this.interval = setInterval(() => {
      console.log(new Date());
    }, 1000)
  }

}

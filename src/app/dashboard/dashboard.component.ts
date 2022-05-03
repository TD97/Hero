import { Component, OnInit } from '@angular/core';
import { Trisha } from '../trisha';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heros : Trisha[] = [];

  constructor(private heroService:HeroService) { }

  ngOnInit(): void {
    this.getHeros();
  }
  getHeros(){
    this.heroService.getHeros().subscribe(heros => this.heros = heros.slice(1,5));
  }

}

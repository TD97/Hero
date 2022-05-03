import { Component, OnInit,Input } from '@angular/core';
import { Trisha } from '../trisha';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  
 @Input()trisha?:Trisha;
  
  constructor(
    private route:ActivatedRoute,
    private heroService:HeroService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  getHero():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero=>this.trisha=hero);
  }
  goBack():void{
    this.location.back();
  }
  save():void{
    if(this.trisha){
      this.heroService.updateHero(this.trisha).subscribe(()=> this.goBack());
    }
  }



}

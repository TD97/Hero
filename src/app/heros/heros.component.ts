import { Component, OnInit } from '@angular/core';
import {Trisha} from '../trisha';
//import{Heros}from '../mockheros';
import { HeroService } from '../hero.service';
import {MessageService} from '../message.service'


@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
 // hero= Heros;
  selectedHero?:Trisha;
  heros:Trisha[]=[];

  constructor(private heroservice:HeroService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.getHeros();
  }
onSelect(trisha:Trisha):void{
  this.selectedHero=trisha;
  
  this.messageService.add(`HerosComponent:Selected hero id=${trisha.id}`);

}
getHeros():void{
 // this.heros=this.heroservice.getHeros();
this.heroservice.getHeros().subscribe( heros => this.heros=heros);
}
add(name:string):void{
  name=name.trim();
  if(!name){return;}
  this.heroservice.addHero({name}as Trisha).subscribe(hero => {this.heros.push(hero)});
}
delete(trisha:Trisha):void{
  this.heros=this.heros.filter(h => h!== trisha);
  this.heroservice.deleteHero(trisha.id).subscribe();
}
}

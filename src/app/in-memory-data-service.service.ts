import { GeneratedFile } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Trisha } from './trisha';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataServiceService implements InMemoryDbService{
  createDb (){
    

 const heros = [
{ id:21, name:'Tamal'},
{id:22, name :'Trisha'},
{id:23,name:'Sruthi'},
{id:24,name:'Shivam'},
{id:25,name:'Sunil'},
{id:26,name:'Prudhvi'}

];
return {heros};
    


    

    
  }
  genId(heros:Trisha[]):number{
    return heros.length>0 ? Math.max(...heros.map(hero=>hero.id))*1:21;
  }

  constructor() {
    
   }
}

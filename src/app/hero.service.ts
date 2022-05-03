import { Injectable } from '@angular/core';
import { Trisha } from './trisha';
//import { Heros } from './mockheros';
import { from, Observable,of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {catchError, tap,map} from 'rxjs/operators';
import {throwError} from'rxjs';
import { Heros } from './mockheros';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroURL='api/heros';
  

  constructor(private messageService:MessageService,private http:HttpClient) {}
    getHeros():Observable<Trisha[]>{
      
      this.messageService.add('HeroService:fetched heros')
      return this.http.get<Trisha[]>(this.heroURL).pipe(
        tap(_=> this.log('fetched heros')),
        catchError(this.handleError<Trisha[]>('getHeros',[]))
        );
      
      
      
   }
   private handleError<T>(operation='operation',result?:T){
     return (error:any):Observable<T> => {console.error(error);
      this.log('$(operation) failed:$(error.message)');
    return of(result as T)}
   };
   getHero(id:number): Observable<Trisha>{
     const url='${this.heroURL}/${id}';
     return this.http.get<Trisha>(url).pipe(
       tap(_=> this.log('fetched hero id=${id}')),
       catchError(this.handleError<Trisha>('getHero id=${id}'))
     );
     //const hero=Heros.find(h => h.id===id)!;
    // this.messageService.add(`HeroService:fetched hero id=${id}`);
     //return of(hero);

   }
   updateHero(trisha:Trisha):Observable<any>{
     return this.http.put(this.heroURL,trisha,this.httpOptions).pipe(
       tap(_=>this.log(`updated hero id=${trisha.id}`)),
       catchError(this.handleError<any>('updateHero'))
     );
   }
   private log(message:string){
     this.messageService.add(`HeroService:${message}`);
   }
   httpOptions={
     headers: new HttpHeaders({'Content-Type':'application/json'})

   }
   addHero(trisha:Trisha):Observable<Trisha>{
     return this.http.post<Trisha>(this.heroURL,Heros,this.httpOptions).pipe(
       tap((newHero:Trisha)=>this.log(`added hero w/id =${newHero.id}`)),
       catchError(this.handleError<Trisha>('addHero'))
     )

   }
   deleteHero(id:number):Observable<Trisha>{
     const url='${this.heroURL}/${id}';
     return this.http.delete<Trisha>(url, this.httpOptions).pipe(
       tap(_=>this.log('deleted hero id=${id}')),
       catchError(this.handleError<Trisha>('deleteHero'))
     );
   }

}

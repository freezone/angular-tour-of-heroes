import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /*
  getHeroes() : Hero[] {
    return HEROES;
  }
  */

  getHeroes() : Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: send the error to remove logging infratstructure
      console.error(error); // log to console insetead

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }

  getHero(id: Number) : Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getHeroByName(urlName: string) : Observable<Hero> {
    const url = `${this.heroesUrl}/${urlName}`;
    //const hero = HEROES.find(h => h.url === urlName)!;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero urlName=${urlName}`)),
      catchError(this.handleError<Hero>(`getHero urlName=${urlName}`))
    )
    //this.messageService.add(`HeroService: fetched hero url=${urlName}`);
    //return of(hero);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes'; // URL to web api

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
}

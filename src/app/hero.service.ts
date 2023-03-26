import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

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
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: Number) : Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetced hero id=${id}`);
    return of(hero);
  }

  getHeroByName(url: string) : Observable<Hero> {
    const hero = HEROES.find(h => h.url === url)!;
    this.messageService.add(`HeroService: fetced hero url=${url}`);
    return of(hero);
  }

  constructor(private messageService: MessageService) { }
}

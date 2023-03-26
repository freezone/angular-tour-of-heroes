import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12,   name: 'Dr Nice',    url: 'dr-nice' },
      { id: 13,   name: 'Bombasto',   url: 'bombasto' },
      { id: 14,   name: 'Celeritas',  url: 'celeritas' },
      { id: 15,   name: 'Magneta',    url: 'magneta' },
      { id: 16,   name: 'RubberMan',  url: 'rubberman' },
      { id: 17,   name: 'Dynama',     url: 'dynama' },
      { id: 18,   name: 'Dr. IQ',     url: 'driq' },
      { id: 19,   name: 'Magma',      url: 'magma' },
      { id: 20,   name: 'Tornado',    url: 'tornado' }    
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  constructor() { }
}

import { Component, Input, Output, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent {

  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.getHero();
    this.getHeroByName();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  getHeroByName(): void {
    const url = this.route.snapshot.paramMap.get('url');
    if(url) this.heroService.getHeroByName(url).subscribe(hero => this.hero = hero); 
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  saveUrl(): void {
    if(this.hero){
      this.heroService.updateHeroUrl(this.hero).subscribe(() => this.goBack());
    }
  }

}

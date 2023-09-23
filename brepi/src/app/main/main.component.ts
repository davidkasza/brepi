import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  beers = [];
  name: string;
  imageUrl: string;
  description: string;
  showDescription = false;

  data: any;

  constructor(private apiService: ApiService) {}

  getBeers() {
    this.apiService.getBeers().subscribe((response) => {
      this.data = response;

      this.beers = this.readBeerDatas(this.beers, this.data);

      this.name = this.beers[0].name;
      console.log(this.beers);
    });
  }

  ngOnInit() {
    this.getBeers();
  }

  readBeerDatas(beers, data) {
    for (let i = 0; i < 6; i++) {
      const beer = { 
        "name": data[i].name,
        "imageUrl": data[i].image_url,
        "description": this.data[i].description,
        "showDescription": false
      }
      beers.push(beer);
    }

    for (let i = 0; i < 6; i++) {
      this.renderBeerDatas(beers[i]);
    }

    return this.beers;
  }

  renderBeerDatas(beer) {
    this.name = beer.name;
    this.imageUrl = beer.image_url;
    this.description = beer.description;
  }

  descriptionTrigger(index: number): void {
    this.beers[index].showDescription = !this.beers[index].showDescription;
  }
}

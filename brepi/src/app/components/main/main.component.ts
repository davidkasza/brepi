import { Component } from '@angular/core';
import { BeerService } from '../../services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-main',
  template: `
    <div class="container mt-4">
      <beer-pagination
        class="beer-pagination"
        [offset]="offset"
        [listLength]="listLength"
        [total]="total"
        (nextEvent)="getNextPage()"
        (prevEvent)="getPrevPage()"
        (getPageEvent)="getPage()"
      ></beer-pagination>
      <div
        *ngFor="let beer of beers; let i = index"
        class="beer-card"
        (mouseenter)="descriptionTrigger(i)"
        (mouseleave)="descriptionTrigger(i)"
      >
        <img
          [src]="beer.imageUrl"
          alt="{{ beer.name }} Image"
          class="beer-image"
          *ngIf="!beer.showDescription"
        />
        <p *ngIf="beer.showDescription">{{ beer.description }}</p>
        <h3>{{ beer.name }}</h3>
      </div>
    </div>
  `,
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  beers = [];
  name: string;
  imageUrl: string;
  description: string;
  showDescription = false;

  offset = 1;
  total = 10;
  listLength = 6;

  from: number = 0;
  to: number = 6;

  data: any;

  constructor(
    private beerService: BeerService,
    private sharedService: SharedService
  ) {}

  async getBeers() {
    const data = await this.beerService.getBeers(
      1,
      this.total * this.listLength
    );
    this.data = data;
    this.beers = this.readBeerData(data);
  }

  ngOnInit() {
    this.getBeers();
  }

  readBeerData(data) {
    this.beers = [];
    for (let i = this.from; i < this.to; i++) {
      const beer = {
        name: data[i].name,
        imageUrl: data[i].image_url,
        description: data[i].description,
        showDescription: false,
      };
      this.beers.push(beer);
    }
    return this.beers;
  }

  descriptionTrigger(index: number): void {
    this.beers[index].showDescription = !this.beers[index].showDescription;
  }

  getNextPage(): void {
    if (this.offset < this.total) {
      this.offset++;
      this.from = (this.offset - 1) * this.listLength;
      this.to = this.offset * this.listLength;
    } else {
      this.offset = 1;
    }
    this.from = (this.offset - 1) * this.listLength;
    this.to = this.offset * this.listLength;
    this.readBeerData(this.data);
  }

  getPrevPage(): void {
    if (this.offset == 1) {
      this.offset = this.total;
      this.from = (this.offset - 1) * this.listLength;
      this.to = this.offset * this.listLength;
    } else {
      this.to = (this.offset - 1) * this.listLength;
      this.offset--;
      this.from = (this.offset - 1) * this.listLength;
    }
    this.readBeerData(this.data);
  }

  getPage(): void {
    this.offset = this.sharedService.getDesiredPage();
    this.from = (this.offset - 1) * this.listLength;
    this.to = this.offset * this.listLength;
    this.readBeerData(this.data);
  }
}

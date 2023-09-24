import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main',
  //changeDetection: ChangeDetectionStrategy.OnPush, //if its with OnPush, it does not load at the first time we open the webpage
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="container">
      <div
        *ngFor="let beer of beers; let i = index"
        class="beer-card"
        (click)="descriptionTrigger(i)"
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
      <beer-pagination class="beer-paginator"
        [offset]="offset"
        [listLength]="listLength"
        [total]="total"
        (nextEvent)="getNextPage()"
        (prevEvent)="getPrevPage()"
      ></beer-pagination>
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
  currentPageData = [];

  data: any;

  constructor(
    private apiService: ApiService,
    private cdref: ChangeDetectorRef
  ) {}

  getBeers() {
    this.apiService.getBeers(this.offset, this.listLength).subscribe(
      (data: any) => {
        this.beers = this.readBeerData(data);
        console.log(this.beers);
      },
      (error) => {
        console.error('Error fetching beer data:', error);
      }
    );
  }

  ngOnInit() {
    this.getBeers();
  }

  ngOnChanges(): void {
    //for some reason it never runs
    console.log('current value of the offset: ' + this.offset);

    this.getBeers();
    this.cdref.markForCheck();
  }

  readBeerData(data) {
    this.beers = [];
    for (let i = 0; i < 6; i++) {
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
    this.offset++;
    this.getBeers();
    this.cdref.markForCheck();
  }

  getPrevPage(): void {
    this.offset--;
    this.getBeers();
    this.cdref.markForCheck();
  }
}

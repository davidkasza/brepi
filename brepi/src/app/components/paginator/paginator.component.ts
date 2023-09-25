import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'beer-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="mt-5">
      <ul class="pagination">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            (click)="offset >= 1 && prevEvent.emit()"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          class="page-item"
          *ngFor="let pageNumber of pageNumbers; let i = index"
        >
          <a
            class="page-link"
            href="#"
            [class.active]="currentPage === pageNumber"
            (click)="goToPage(pageNumber)"
            >{{ pageNumber }}</a
          >
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            (click)="offset <= 10 && nextEvent.emit()"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      .active {
        background-color: blue;
      }
    `,
  ],
})
export class BeerPaginationComponent implements OnChanges {
  constructor(private sharedService: SharedService) {}

  @Input() offset: number;
  @Input() listLength: number;
  @Input() total: number;

  currentPage: number;
  desiredPage: number;

  @Output() nextEvent = new EventEmitter<any>();
  @Output() prevEvent = new EventEmitter<any>();
  @Output() getPageEvent = new EventEmitter<any>();

  totalPages: number;
  pageNumbers: number[];

  ngOnInit() {
    this.currentPage = 1;
    this.totalPages = this.total;
    this.updatePageNumbers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total) {
      this.totalPages = this.total;
      this.updatePageNumbers();
    }

    if (changes.offset) {
      this.currentPage = this.offset;
    }
  }

  updatePageNumbers() {
    this.pageNumbers = Array.from(Array(this.totalPages), (_, i) => i + 1);
  }

  goToPage(pageNumber: number) {
    if (this.currentPage !== pageNumber) {
      this.sharedService.setDesiredPage(pageNumber);
      this.currentPage = pageNumber;
      this.getPageEvent.emit(this.currentPage);
    }
  }
}

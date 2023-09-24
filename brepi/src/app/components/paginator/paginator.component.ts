import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'beer-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="mt-5">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" (click)="offset > 1 && prevEvent.emit()">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" *ngFor="let pageNumber of pageNumbers">
          <a
            class="page-link"
            [class.active]="currentPage === pageNumber"
            >{{ pageNumber }}</a
          >
        </li>
        <li class="page-item">
          <a class="page-link" href="#" (click)="offset < 10 && nextEvent.emit()">
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
  @Input() offset: number;
  @Input() listLength: number;
  @Input() total: number;

  currentPage: number;

  @Output() nextEvent = new EventEmitter<any>();
  @Output() prevEvent = new EventEmitter<any>();

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
}

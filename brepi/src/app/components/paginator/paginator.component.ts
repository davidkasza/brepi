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
  // template: `
  // <span class="left">{{listLength < total ? listLength : total}} / {{total}}</span>
  // <span class="right">
  //   <a (click)="prevEvent.emit()" *ngIf="offset > 0"><fa-icon icon="arrow-left" style="margin-right: 5px"></fa-icon></a>
  //   {{ currentPage }}/{{ totalPage}}
  //   <a (click)="nextEvent.emit()" *ngIf="offset <  total"><fa-icon icon="arrow-right" style="margin-left: 5px"></fa-icon></a>
  //  </span>
  // `,
  template: `
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" (click)="offset > 1 && prevEvent.emit()">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <!-- <li class="page-item"><a class="page-link" href="#" *ngIf="currentPage > 1">{{ currentPage - 1}}</a></li>
        <li class="page-item"><a class="page-link" href="#">{{ currentPage}}</a></li>
        <li class="page-item"><a class="page-link" href="#">{{ currentPage + 1}}</a></li> -->
        <li class="page-item" *ngFor="let pageNumber of pageNumbers">
          <a
            class="page-link"
            href="#"
            [class.active]="currentPage === pageNumber"
            >{{ pageNumber }}</a
          >
        </li>
        <li class="page-item">
          <a class="page-link" (click)="offset < 10 && nextEvent.emit()">
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
  totalPage: number;

  @Output() nextEvent = new EventEmitter<any>();
  @Output() prevEvent = new EventEmitter<any>();

  totalPages: number = 10;
  pageNumbers: number[] = Array.from(
    { length: this.totalPages },
    (_, i) => i + 1
  );

  ngOnInit() {
    this.currentPage = 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.currentPage = this.offset;
    }
  }
}

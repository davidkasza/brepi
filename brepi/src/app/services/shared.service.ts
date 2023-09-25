import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  private desiredPage: number;

  setDesiredPage(pageNumber: number): void {
    this.desiredPage = pageNumber;
  }

  getDesiredPage(): number {
    return this.desiredPage;
  }
}
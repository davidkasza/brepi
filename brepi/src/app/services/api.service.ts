import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private apiUrl = 'https://api.punkapi.com/v2/beers';

  constructor(private http: HttpClient) {}

  getBeers(page: number, perPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
    return this.http.get(this.apiUrl, { params });
  }
}

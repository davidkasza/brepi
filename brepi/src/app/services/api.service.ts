import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BeerError } from '../errors/beer-error';

@Injectable({
  providedIn: 'root',
})

export class BeerService {
  private apiUrl = 'https://api.punkapi.com/v2/beers';

  constructor(private http: HttpClient) {}

  async getBeers(page: number, perPage: number): Promise<any> {
    try {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('per_page', perPage.toString());

      const data = await firstValueFrom(this.http.get(this.apiUrl, { params }));
      return data;
    } catch (error) {
      throw new BeerError(`[Beer Fetching] ${error}`);
    }
  }
}
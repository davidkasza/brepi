import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    private apiUrl = 'https://api.punkapi.com/v2/beers?page=1&per_page=6';

    constructor(private http: HttpClient) {}

    getBeers(): Observable<any> {
        const url = `${this.apiUrl}`;
        return this.http.get(url);
    }
}

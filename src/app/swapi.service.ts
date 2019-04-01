import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SWApiService {
  constructor(private http: HttpClient) {}

  getPeople(pageNumber: number) {
    return this.http.get(this.buildUrl(pageNumber)).pipe(
      map(
        (page: any[]): Person[] =>
          page.map(({ name, birth_year: birthYear, height, gender }) => ({
            name,
            height,
            gender,
            birthYear,
          }))
      )
    );
  }

  private buildUrl(page: number): string {
    return `${environment.apiUrl}?page=${page + 1}`;
  }
}

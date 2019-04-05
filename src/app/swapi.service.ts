import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SWApiService {
  constructor(private http: HttpClient) {}

  getPeople(pageNumber: number) {
    return this.http.get<APIResponse>(this.buildUrl(pageNumber));
  }

  private buildUrl(page: number): string {
    return `${environment.apiUrl}?page=${page}`;
  }
}

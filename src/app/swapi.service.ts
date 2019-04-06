import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

/**
 * Service to interact with the Star Wars API.
 */
@Injectable({
  providedIn: 'root',
})
export class SWApiService {
  constructor(private http: HttpClient) {}

  /**
   * Gets a page of people from the Star Wars API.
   */
  getPeople(pageNumber: number) {
    return this.http.get<APIResponse>(this.buildUrl(pageNumber));
  }

  /**
   * Builds a URL to get a specific page of data.
   */
  private buildUrl(page: number): string {
    return `${environment.apiUrl}?page=${page}`;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { of as ObservableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { SWApiService } from './swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SWApiService],
})
export class AppComponent implements OnInit {
  readonly columns = ['name', 'birthYear', 'height', 'gender'];
  // Number of people in the Star Wars API
  count = 0;
  // People that are currently displayed.
  data: Person[] = [];
  isLoading = true;
  didErrorOccur = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private swapi: SWApiService) {}

  ngOnInit() {
    // Subscribe to page change events.
    this.paginator.page
      .pipe(
        // Extract the current page whenever it changes.
        map(({ pageIndex }) => pageIndex),
        // Have to start with 0 because page doesn't emit its initial value.
        startWith(0),
        switchMap((pageIndex) => {
          this.isLoading = true;
          // Paging on SWAPI is 1-indexed, so add 1
          return this.swapi.getPeople(pageIndex + 1);
        }),
        // Extract the count and results from the response
        map(({ count, results }) => {
          // Display the table
          this.isLoading = false;
          // Set the count (for the paginator)
          this.count = count;
          return results.map(({ name, birth_year, height, gender }) => ({
            name,
            birth_year,
            height,
            gender,
          }));
        }),
        catchError(() => {
          // Display an error view.
          this.didErrorOccur = true;
          return ObservableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }
}

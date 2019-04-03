import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { of as ObservableOf } from 'rxjs';
import { catchError, map, switchMap, startWith } from 'rxjs/operators';
import { SWApiService } from './swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SWApiService],
})
export class AppComponent implements AfterViewInit {
  readonly columns = ['name', 'birthYear', 'height', 'gender'];
  title = 'star-wars';
  isLoading = true;
  count = 0;
  didErrorOccur = false;
  hasPreviousPage = false;
  hasNextPage = false;
  data: Person[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private swapi: SWApiService) {}

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({ pageIndex: 0 }),
        switchMap(({ pageIndex }) => {
          this.isLoading = true;
          return this.swapi.getPeople(pageIndex + 1);
        }),
        map((response) => {
          this.isLoading = false;
          this.count = response.count;
          this.hasNextPage = response.next !== null;
          this.hasPreviousPage = response.previous !== null;
          return response.results;
        }),
        catchError((err, caught) => {
          return ObservableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }
}

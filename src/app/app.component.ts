import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of as ObservableOf } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SWApiService } from './swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SWApiService],
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'star-wars';
  isLoading = true;
  didErrorOccur = false;
  hasPreviousPage = false;
  hasNextPage = false;
  pageIndex$ = new BehaviorSubject(1);
  data: Person[] = [];

  constructor(private swapi: SWApiService) {}

  ngOnInit() {
    this.pageIndex$
      .pipe(
        switchMap((page) => {
          this.isLoading = true;
          return this.swapi.getPeople(page);
        }),
        map((response) => {
          this.isLoading = false;
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

  ngOnDestroy() {
    this.pageIndex$.complete();
  }
}

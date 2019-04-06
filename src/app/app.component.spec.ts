import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatPaginator,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSpinner,
  MatTable,
  MatTableModule,
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of as ObservableOf, Subject, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { SWApiService } from './swapi.service';

const mockSWApiService = {
  getPeople: jasmine.createSpy('getPeople'),
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    mockSWApiService.getPeople.calls.reset();
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: SWApiService,
          useValue: mockSWApiService,
        },
      ],
    }).compileComponents();
  }));

  const getSpinner = (fixture: ComponentFixture<AppComponent>) =>
    fixture.debugElement.query(By.directive(MatSpinner));

  const getErrorMessage = (fixture: ComponentFixture<AppComponent>) =>
    fixture.debugElement.query(By.css('h1#error-message'));

  const getPaginator = (fixture: ComponentFixture<AppComponent>) =>
    fixture.debugElement.query(By.directive(MatPaginator));

  const isPaginatorVisible = (fixture: ComponentFixture<AppComponent>) =>
    getPaginator(fixture).styles.visibility !== 'hidden';

  const getTable = (fixture: ComponentFixture<AppComponent>) =>
    fixture.debugElement.query(By.directive(MatTable));

  it('displays a loading screen initially', () => {
    const restCall = new Subject();
    mockSWApiService.getPeople.and.returnValue(restCall);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(getSpinner(fixture)).not.toBeNull();
    expect(getErrorMessage(fixture)).toBeNull();
    expect(getTable(fixture)).toBeNull();
    expect(isPaginatorVisible(fixture)).toBe(false);

    restCall.complete();
  });

  it('displays error view if API call fails', () => {
    mockSWApiService.getPeople.and.returnValue(throwError(Error));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const appInstance: AppComponent = fixture.debugElement.componentInstance;
    expect(appInstance.isLoading).toBeFalsy();
    expect(appInstance.didErrorOccur).toBeTruthy();
    expect(getSpinner(fixture)).toBeNull();
    expect(getErrorMessage(fixture)).not.toBeNull();
    expect(getTable(fixture)).toBeNull();
    expect(isPaginatorVisible(fixture)).toBe(false);
  });

  describe('after API call resolves', () => {
    beforeEach(() => {
      // Return a single person back whenever a page is requested
      mockSWApiService.getPeople.and.returnValue(
        ObservableOf({
          count: 1,
          results: [
            {
              name: 'Luke Skywalker',
              height: '172',
              birth_year: '19BBY',
              gender: 'male',
            },
          ],
        })
      );
    });

    it('displays table and paginator when API call succeeds', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const appInstance: AppComponent = fixture.debugElement.componentInstance;
      expect(appInstance.isLoading).toBeFalsy();
      expect(appInstance.didErrorOccur).toBeFalsy();
      expect(getSpinner(fixture)).toBeNull();
      expect(getErrorMessage(fixture)).toBeNull();

      const table = getTable(fixture);
      expect(table).not.toBeNull();
      expect(table.componentInstance.dataSource).toBe(appInstance.data);

      const getTextFromColumn = (
        columnName: 'name' | 'birth-year' | 'gender' | 'height'
      ) => {
        return table.nativeElement.querySelector(`.person-${columnName}`)
          .innerText;
      };

      expect(getTextFromColumn('name')).toBe('Luke Skywalker');
      expect(getTextFromColumn('birth-year')).toBe('19BBY');
      expect(getTextFromColumn('height')).toBe('172');
      expect(getTextFromColumn('gender')).toBe('male');

      const paginator = getPaginator(fixture);
      expect(paginator.styles.visibility).toBe('visible');
      expect(paginator.componentInstance.length).toBe(appInstance.count);
      expect(paginator.componentInstance.pageSize).toBe(10);
    });

    it('makes another API call when the page changes', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const appInstance: AppComponent = fixture.debugElement.componentInstance;

      const mockPageChangeEvent = (pageIndex: number) =>
        appInstance.paginator.page.emit({ pageIndex } as any);

      const mostRecentPageRequested = () =>
        mockSWApiService.getPeople.calls.mostRecent().args[0];

      // Verify that the first page was requested
      expect(mockSWApiService.getPeople).toHaveBeenCalledTimes(1);
      expect(mostRecentPageRequested()).toBe(1);

      mockPageChangeEvent(1);
      expect(mockSWApiService.getPeople).toHaveBeenCalledTimes(2);
      expect(mostRecentPageRequested()).toBe(2);

      mockPageChangeEvent(4);
      expect(mockSWApiService.getPeople).toHaveBeenCalledTimes(3);
      expect(mostRecentPageRequested()).toBe(5);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SWApiService } from './swapi.service';
import { environment } from 'src/environments/environment';

describe('SWApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('gets data', () => {
    const service: SWApiService = TestBed.get(SWApiService);
    expect(service).toBeTruthy();

    const mockResponse: any = {
      count: 1,
      previous: null,
      next: null,
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          birth_year: '19BBY',
          gender: 'male',
        },
      ],
    };

    service.getPeople(1).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}?page=1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);

    // Assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});

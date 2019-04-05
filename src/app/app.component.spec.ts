import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SWApiService } from './swapi.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
} from '@angular/material';

const mockSWApiService = {
  getPeople: jasmine.createSpy('getPeople'),
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatProgressSpinnerModule,
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

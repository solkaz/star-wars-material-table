import { Component, OnInit } from '@angular/core';
import { SWApiService } from './swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SWApiService],
})
export class AppComponent implements OnInit {
  title = 'star-wars';

  constructor(private swapi: SWApiService) {}

  ngOnInit() {
    this.swapi.getPeople(0).subscribe(console.log, console.error);
  }
}

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SWApiService } from './swapi.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  providers: [SWApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}

/// <reference types="@angular/localize" />

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      NgbModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch(err => console.error(err));

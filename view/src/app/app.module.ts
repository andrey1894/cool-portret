import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LandingPagesModule } from './landing-pages/landing-pages.module';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './error-page';
import { AppComponent } from './app.component';
import { CoreModule } from './core';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    LandingPagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

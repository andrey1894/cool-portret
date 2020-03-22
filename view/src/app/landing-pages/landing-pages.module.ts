import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPagesRoutingModule } from './landing-pages-routing.module';
import { SharedModule } from './shared';

import { HomePageComponent } from './home-page/home-page.component';
import { LandingPagesComponent } from './landing-pages.component';

@NgModule({
  declarations: [
    LandingPagesComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingPagesRoutingModule
  ],
})
export class LandingPagesModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './error-page';

const routes: Routes = [
  { path: '', loadChildren: () => import('./landing-pages/landing-pages.module').then(m => m.LandingPagesModule) },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

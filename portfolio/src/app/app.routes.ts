import { Routes } from '@angular/router';
import { HomeComponent } from './main/components/home/home.component';
import { DetailsComponent } from './main/components/details/details.component';
import { NotFoundComponent } from './main/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

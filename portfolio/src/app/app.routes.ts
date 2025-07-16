import { Routes } from '@angular/router';
import { HomeComponent } from './main/components/home/home.component';
import { DetailsComponent } from './main/components/details/details.component';
import { NotFoundComponent } from './main/components/not-found/not-found.component';
import { AboutComponent } from './main/components/about/about.component';
import { ProjectsComponent } from './main/components/projects/projects.component';

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
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
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

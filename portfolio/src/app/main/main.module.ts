import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    DetailsComponent,
    HomeComponent,
    NotFoundComponent,
    ProjectsComponent,
    AboutComponent,
  ],
  imports: [CommonModule],
})
export class MainModule {}

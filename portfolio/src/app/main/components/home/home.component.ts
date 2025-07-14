import { Component, OnInit } from '@angular/core';
import { Project } from '../../../shared/models/project.model';
import { ProjectsService } from '../../../shared/service/projects.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private service: ProjectsService) {}

  protected projects: Project[] = [];

  ngOnInit(): void {
    this.service.getProjects().subscribe({
      next: (res: Project[]) => {
        this.projects = res;
      },
    });
  }
}

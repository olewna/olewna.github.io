import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/service/projects.service';
import { Router } from '@angular/router';
import { Project } from '../../../shared/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  constructor(private service: ProjectsService, private router: Router) {}

  protected projects: Project[] = [];

  ngOnInit(): void {
    this.service.getProjects().subscribe({
      next: (res: Project[]) => {
        this.projects = res;
      },
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['details', id]);
  }
}

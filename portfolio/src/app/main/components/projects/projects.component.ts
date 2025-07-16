import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/service/projects.service';
import { Router } from '@angular/router';
import { Project, ProjectModel } from '../../../shared/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  constructor(private service: ProjectsService, private router: Router) {}

  protected projects: ProjectModel[] = [];
  protected loading: boolean = true;

  ngOnInit(): void {
    this.loading = true;
    this.service.getProjects().subscribe({
      next: (res: Project[]) => {
        this.projects = res.map((x) => {
          this.loading = false;
          return {
            ...x,
            languages: x.languages.map((lang) => lang.name).join(', '),
          };
        });
      },
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['details', id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/service/projects.service';
import { Project } from '../../../shared/models/project.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(private service: ProjectsService) {}

  protected project!: Project;

  ngOnInit(): void {
    this.service.getProjects().subscribe({
      next: (res: Project[]) => {},
    });
  }
}

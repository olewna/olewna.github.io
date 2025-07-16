import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/service/projects.service';
import { Project } from '../../../shared/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(
    private service: ProjectsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  protected project: Project | null = null;
  protected id!: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.service.getProjects().subscribe({
      next: (res: Project[]) => {
        const result = res.filter((x) => x.id == this.id);

        if (result.length > 0) {
          this.project = result[0];
        }
      },
    });
  }

  goBack() {
    this.location.back();
  }
}

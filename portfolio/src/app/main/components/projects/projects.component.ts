import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/service/projects.service';
import { Router } from '@angular/router';
import { Project, ProjectModel } from '../../../shared/models/project.model';
import gsap from 'gsap';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  constructor(
    private service: ProjectsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  protected projects: ProjectModel[] = [];
  protected loading: boolean = true;

  ngOnInit(): void {
    this.loading = true;
    this.service.getProjects().subscribe({
      next: (res: Project[]) => {
        this.projects = res.map((x) => {
          return {
            ...x,
            languages: x.languages.map((lang) => lang.name).join(', '),
          };
        });

        this.loading = false;
        this.cdr.detectChanges();
        this.animateCards();
      },
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['details', id]);
  }

  private animateCards(): void {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
      const timeline = gsap.timeline();

      timeline
        .from(card.querySelector('.image'), {
          opacity: 0,
          y: -100,
          duration: 0.7,
        })
        .from(card.querySelector('.language'), {
          opacity: 0,
          y: -100,
          duration: 0.7,
        })
        .from(card.querySelector('.title'), {
          opacity: 0,
          y: -100,
          duration: 0.7,
        });

      timeline.play(0);
    });
  }
}

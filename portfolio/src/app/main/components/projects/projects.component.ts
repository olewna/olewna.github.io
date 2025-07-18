import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/service/projects.service';
import { Router } from '@angular/router';
import { Project, ProjectModel } from '../../../shared/models/project.model';
import gsap from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  constructor(
    private service: ProjectsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  protected projects: ProjectModel[] = [];
  protected loading: boolean = true;
  private cardTimelines: gsap.core.Timeline[] = [];
  private sub!: Subscription;

  ngOnInit(): void {
    this.loading = true;

    this.loadProjects(this.translate.currentLang || 'pl');

    this.sub = this.translate.onLangChange.subscribe((event) => {
      this.loading = true;
      this.loadProjects(event.lang); // wywołuje się na początku też !!!!!
    });
  }

  private loadProjects(language: string) {
    this.service.getProjects(language).subscribe({
      next: (res: Project[]) => {
        this.projects = res.map((x) => {
          return {
            ...x,
            languages: x.languages.map((lang) => lang.name).join(', '),
          };
        });

        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
          this.animateCards();
        }, 100);
      },
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['details', id]);
  }

  private animateCards(): void {
    const cards = document.querySelectorAll('.card');

    this.cardTimelines.forEach((tl) => tl.kill());
    this.cardTimelines = [];

    cards.forEach((card) => {
      const timeline = gsap.timeline();

      timeline
        .set(card.querySelector('.image'), { opacity: 0, y: -100 }) // stan początkowy, żeby się nie bugowało !!!
        .set(card.querySelector('.language'), { opacity: 0, y: -100 })
        .set(card.querySelector('.title'), { opacity: 0, y: -100 })
        .to(card.querySelector('.image'), { opacity: 1, y: 0, duration: 0.7 })
        .to(card.querySelector('.language'), {
          opacity: 1,
          y: 0,
          duration: 0.7,
        })
        .to(card.querySelector('.title'), { opacity: 1, y: 0, duration: 0.7 });

      this.cardTimelines.push(timeline);

      timeline.play(0);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.cardTimelines.forEach((tl) => tl.kill());
    this.cardTimelines = [];
  }
}

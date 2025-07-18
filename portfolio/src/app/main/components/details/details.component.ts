import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/service/projects.service';
import { Project } from '../../../shared/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import gsap from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  constructor(
    private service: ProjectsService,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  protected project: Project | null = null;
  protected id!: string;
  protected loading = true;
  private sub!: Subscription;
  private timeline: gsap.core.Timeline | null = null;

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.loadProject(this.translate.currentLang || 'pl');

    this.sub = this.translate.onLangChange.subscribe((event) => {
      this.loading = true;
      this.loadProject(event.lang);
    });
  }

  private loadProject(language: string) {
    this.service.getProjects(language).subscribe({
      next: (res: Project[]) => {
        const result = res.filter((x) => x.id == this.id);

        if (result.length > 0) {
          console.log('XD');
          this.project = result[0];

          setTimeout(() => {
            this.loading = false;
            this.cdr.detectChanges();
            this.animateCard();
            return;
          }, 100);
        } else {
          this.loading = false;
        }
      },
    });
  }

  private animateCard(): void {
    const card = document.querySelector('.card');

    if (!card) return;

    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
    this.timeline = gsap.timeline();

    const videoSelector = card.querySelectorAll('.video');

    // ustawianie
    this.timeline
      .set(card.querySelector('.title'), { opacity: 0, y: -100 })
      .set(card.querySelector('.technologies'), { opacity: 0, y: -100 })
      .set(card.querySelectorAll('.language'), { opacity: 0, y: -100 })
      .set(card.querySelectorAll('.image'), { opacity: 0, y: -100 })
      .set(card.querySelector('.description'), { opacity: 0, y: -100 })
      .set(card.querySelectorAll('.link'), { opacity: 0, y: -100 });
    if (videoSelector.length > 0) {
      this.timeline.set(card.querySelectorAll('.video'), {
        opacity: 0,
        y: -100,
      });
    }

    // animacja ruchu
    this.timeline
      .to(card.querySelector('.title'), { opacity: 1, y: 0, duration: 0.5 })
      .to(card.querySelector('.technologies'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
      })
      .to(card.querySelectorAll('.language'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      })
      .to(card.querySelectorAll('.image'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      });

    if (videoSelector.length > 0) {
      this.timeline.to(card.querySelectorAll('.video'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      });
    }
    this.timeline
      .to(card.querySelector('.description'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
      })
      .to(card.querySelectorAll('.link'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      });

    this.timeline.play(0);
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

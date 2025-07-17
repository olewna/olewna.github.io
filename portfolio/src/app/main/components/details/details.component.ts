import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/service/projects.service';
import { Project } from '../../../shared/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(
    private service: ProjectsService,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef
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

          this.cdr.detectChanges();

          this.animateCard();
        }
      },
    });
  }

  private animateCard(): void {
    const card = document.querySelector('.card');

    if (!card) return;

    const timeline = gsap.timeline();

    timeline
      .from(card.querySelector('.title'), {
        opacity: 0,
        y: -100,
        duration: 0.5,
      })
      .from(card.querySelector('.technologies'), {
        opacity: 0,
        y: -100,
        duration: 0.5,
      })
      .from(card.querySelectorAll('.language'), {
        opacity: 0,
        y: -100,
        duration: 0.5,
        stagger: 0.1,
      })
      .from(card.querySelectorAll('.image'), {
        opacity: 0,
        y: -100,
        duration: 0.5,
        stagger: 0.1,
      })
      .from(card.querySelectorAll('.video'), {
        opacity: 0,
        y: -100,
        duration: 0.5,
        stagger: 0.1,
      })
      .from(card.querySelector('.description'), {
        opacity: 0,
        y: -100,
        duration: 0.5,
      })
      .from(card.querySelectorAll('.link'), {
        opacity: 0,
        y: -100,
        duration: 0.5,
        stagger: 0.1,
      });

    timeline.play(0);
  }

  goBack() {
    this.location.back();
  }
}

import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import gsap from 'gsap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  constructor(private translate: TranslateService) {}

  private imgTimeline!: gsap.core.Timeline;
  private aboutTimeline!: gsap.core.Timeline;
  private sub!: Subscription;
  private firstChange: boolean = true;

  ngAfterViewInit(): void {
    this.animateImage();
    this.animateText(1);

    this.sub = this.translate.onLangChange.subscribe(() => {
      if (this.firstChange) {
        this.firstChange = false;
        this.animateText(1);
      } else {
        this.animateText(0);
      }
    });
  }

  private animateImage(): void {
    const about = document.querySelector('section');

    if (!about) return;
    this.imgTimeline = gsap.timeline();

    this.imgTimeline
      .set(about.querySelector('.about-img'), {
        opacity: 0,
        y: -100,
      })
      .to(about.querySelector('.about-img'), {
        opacity: 1,
        y: 0,
        duration: 1,
      });

    this.imgTimeline.play(0);
  }

  private animateText(delay: number): void {
    const about = document.querySelector('section');

    if (!about) return;
    this.aboutTimeline = gsap.timeline();

    this.aboutTimeline
      .set(about.querySelector('.about'), {
        opacity: 0,
        y: -100,
      })
      .to(about.querySelector('.about'), {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: delay,
      });

    this.aboutTimeline.play(0);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.aboutTimeline.kill();
    this.imgTimeline.kill();
  }
}

import {
  AfterViewInit,
  Component,
  computed,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import gsap from 'gsap';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../shared/service/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  constructor(
    private translate: TranslateService,
    private themeService: ThemeService
  ) {}

  private sub!: Subscription;
  private timeline!: gsap.core.Timeline;

  public theme = computed(() => this.themeService.themeSignal());

  toggleTheme() {
    this.themeService.updateTheme();
  }

  ngAfterViewInit(): void {
    this.animateHome();

    this.sub = this.translate.onLangChange.subscribe(() => {
      if (this.timeline) {
        this.timeline.kill();
      }
      this.animateHome();
    });
  }

  animateHome() {
    this.timeline = gsap.timeline();
    this.timeline
      .set('.anim', {
        opacity: 0,
        y: 150,
      })
      .to('.anim', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.5,
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.timeline.kill();
  }
}

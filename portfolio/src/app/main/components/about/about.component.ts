import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.animateAbout();
  }

  private animateAbout(): void {
    const about = document.querySelector('section');

    if (!about) return;
    const timeline = gsap.timeline();

    timeline
      .from(about.querySelector('.about-img'), {
        opacity: 0,
        y: -100,
        duration: 0.7,
        delay: 0.5,
      })
      .from(about.querySelector('.about'), {
        opacity: 0,
        y: -100,
        duration: 0.7,
      });

    timeline.play(0);
  }
}

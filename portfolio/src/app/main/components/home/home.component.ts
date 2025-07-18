import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import gsap from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  constructor(private translate: TranslateService) {}

  ngAfterViewInit(): void {
    this.animateHome();

    // this.translate.onLangChange.subscribe((event) => {
    //   this.animateHome();
    // });
  }

  animateHome() {
    gsap.to('.anim', {
      opacity: 1,
      y: 0,
      duration: 0.1,
      stagger: 0.5,
    });
  }
}

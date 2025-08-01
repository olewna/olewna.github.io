import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Image, Video } from '../../models/project.model';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperComponent {
  constructor(private themeService: ThemeService) {}
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  @Input() images: Image[] = [];
  @Input() videos: Video[] = [];
  @Input() isVideos: boolean = false;
  // test_images2 = [
  //   'https://swiperjs.com/demos/images/nature-7.jpg',
  //   'https://swiperjs.com/demos/images/nature-7.jpg',
  //   'https://swiperjs.com/demos/images/nature-7.jpg',
  //   'https://swiperjs.com/demos/images/nature-7.jpg',
  // ];
  @Input() title: string = '';

  public theme = computed(() => this.themeService.themeSignal());

  toggleTheme() {
    this.themeService.updateTheme();
  }

  goNext() {
    // Dostęp do API Swipera przez właściwość .swiper
    this.swiperContainer.nativeElement.swiper.slideNext();
  }

  goPrev() {
    this.swiperContainer.nativeElement.swiper.slidePrev();
  }
}

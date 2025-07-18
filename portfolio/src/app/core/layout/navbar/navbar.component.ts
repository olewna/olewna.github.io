import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private router: Router, private translate: TranslateService) {
    const savedLanguage = localStorage.getItem('language') || 'pl';
    this.currentLanguage = savedLanguage;
    this.translate.use(savedLanguage);
  }

  // zamykanie okna z jezykami do wyboru i mobile nav bara

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    this.languageMenuOpen = false;
    this.menuOpen = false;
  }

  // languages

  protected currentLanguage = 'pl';
  protected languageMenuOpen = false;

  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

  toggleLanguageMenu() {
    this.languageMenuOpen = !this.languageMenuOpen;
    this.menuOpen = false;
  }

  closeLanguageMenu() {
    this.languageMenuOpen = false;
  }

  // menu

  protected menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.languageMenuOpen = false;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  // navigation

  gotoHome() {
    this.router.navigate(['home']);
  }

  gotoAbout() {
    this.router.navigate(['about']);
  }

  gotoProjects() {
    this.router.navigate(['projects']);
  }
}

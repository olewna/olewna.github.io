import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private router: Router) {}

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

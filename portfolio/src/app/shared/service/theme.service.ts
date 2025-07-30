import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeSignal = signal<string>('dark');

  setTheme(theme: string) {
    this.themeSignal.set(theme);
  }

  updateTheme() {
    this.themeSignal.update((t) => (t === 'dark' ? 'light' : 'dark'));
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(this.themeSignal());
  }
}

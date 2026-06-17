import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button (click)="toggle()" class="btn-ghost p-2 rounded-lg" [attr.aria-label]="isDark ? 'Activar modo claro' : 'Activar modo oscuro'">
      @if (isDark) {
        <span class="text-lg">&#x2600;</span>
      } @else {
        <span class="text-lg">&#x1F319;</span>
      }
    </button>
  `
})
export class ThemeToggleComponent implements OnInit {
  isDark = false;

  ngOnInit() {
    this.isDark = document.documentElement.classList.contains('dark');
  }

  toggle() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }
}

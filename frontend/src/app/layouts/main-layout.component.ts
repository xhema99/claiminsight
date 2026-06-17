import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="min-h-screen bg-surface-secondary dark:bg-surface-dark">
      <app-sidebar [collapsed]="sidebarCollapsed()" (toggle)="sidebarCollapsed.set(!sidebarCollapsed())" />

      <div class="transition-all duration-300 min-h-screen"
        [class.ml-64]="!sidebarCollapsed()" [class.ml-18]="sidebarCollapsed()">

        <header class="h-16 bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark flex items-center px-6 sticky top-0 z-30">
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <span>ClaimInsight</span>
            <span>/</span>
            <span class="text-gray-600 dark:text-gray-300 font-medium">{{ currentPage }}</span>
          </div>
        </header>

        <main class="p-6 lg:p-8 animate-fade-in">
          <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class MainLayoutComponent {
  sidebarCollapsed = signal(false);

  get currentPage(): string {
    const path = window.location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/claims/new')) return 'Nuevo Reclamo';
    if (path.includes('/claims')) return 'Reclamos';
    return 'Dashboard';
  }
}

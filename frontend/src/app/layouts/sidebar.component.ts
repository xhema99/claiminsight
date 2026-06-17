import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { ThemeToggleComponent } from '../shared/theme-toggle.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  template: `
    <aside class="fixed top-0 left-0 z-40 h-full bg-surface dark:bg-surface-dark border-r border-border dark:border-border-dark transition-all duration-300 flex flex-col"
      [class.w-64]="!collapsed()" [class.w-18]="collapsed()">
      <div class="h-16 flex items-center gap-3 px-4 border-b border-border dark:border-border-dark">
        <div class="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center shrink-0">
          <span class="text-white font-bold text-sm">CI</span>
        </div>
        @if (!collapsed()) {
          <span class="font-semibold text-gray-900 dark:text-white text-sm tracking-tight">ClaimInsight</span>
        }
      </div>

      <nav class="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        <a routerLink="/dashboard" routerLinkActive="bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400 font-medium"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          [class.justify-center]="collapsed()" [title]="collapsed() ? 'Dashboard' : ''">
          <span class="text-base shrink-0">▣</span>
          @if (!collapsed()) { <span>Dashboard</span> }
        </a>
        <a routerLink="/claims" routerLinkActive="bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400 font-medium"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          [class.justify-center]="collapsed()" [title]="collapsed() ? 'Reclamos' : ''">
          <span class="text-base shrink-0">📋</span>
          @if (!collapsed()) { <span>Reclamos</span> }
        </a>
        <a routerLink="/claims/new" routerLinkActive="bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400 font-medium"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          [class.justify-center]="collapsed()" [title]="collapsed() ? 'Nuevo Reclamo' : ''">
          <span class="text-base shrink-0">➕</span>
          @if (!collapsed()) { <span>Nuevo Reclamo</span> }
        </a>
      </nav>

      <div class="p-3 border-t border-border dark:border-border-dark space-y-2">
        @if (!collapsed()) {
          <div class="flex items-center gap-3 px-3 py-2">
            <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-medium shrink-0">
              {{ initials }}
            </div>
            <div class="truncate">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ auth.userName() }}</p>
              <p class="text-xs text-gray-400">Administrador</p>
            </div>
          </div>
        }
        <div class="flex items-center gap-1" [class.justify-center]="collapsed()">
          <app-theme-toggle />
          <button (click)="auth.logout()" class="btn-ghost p-2 rounded-lg" title="Cerrar sesión">
            <span class="text-base">🚪</span>
          </button>
          <button (click)="toggle.emit()" class="btn-ghost p-2 rounded-lg ml-auto" [title]="collapsed() ? 'Expandir' : 'Colapsar'">
            <span class="text-sm">{{ collapsed() ? '→' : '←' }}</span>
          </button>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  auth = inject(AuthService);
  collapsed = input(false);
  toggle = output();

  get initials(): string {
    const name = this.auth.userName() || '';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U';
  }
}

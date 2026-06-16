import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow border-b">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div class="flex items-center gap-6">
            <span class="text-xl font-bold text-blue-600">ClaimInsight</span>
            <a routerLink="/dashboard" routerLinkActive="text-blue-600 font-semibold" class="text-gray-600 hover:text-blue-600 transition">Dashboard</a>
            <a routerLink="/claims" routerLinkActive="text-blue-600 font-semibold" class="text-gray-600 hover:text-blue-600 transition">Reclamos</a>
            <a routerLink="/claims/new" routerLinkActive="text-blue-600 font-semibold" class="text-gray-600 hover:text-blue-600 transition">Nuevo Reclamo</a>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-500">{{ auth.userName() }}</span>
            <button (click)="auth.logout()" class="bg-red-500 text-white px-4 py-1.5 rounded text-sm hover:bg-red-600 transition">Salir</button>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto px-4 py-8"><router-outlet /></main>
    </div>
  `
})
export class MainLayoutComponent { auth = inject(AuthService); }

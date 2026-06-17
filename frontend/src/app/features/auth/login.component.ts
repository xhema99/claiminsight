import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex">
      <div class="flex-1 flex items-center justify-center px-6 lg:px-12 bg-surface dark:bg-surface-dark">
        <div class="w-full max-w-sm animate-slide-up">
          <div class="mb-10">
            <div class="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center mb-6">
              <span class="text-white font-bold">CI</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Ingresá a ClaimInsight</h1>
            <p class="text-muted mt-1.5">Sistema de gestión inteligente de reclamos</p>
          </div>

          <form #f="ngForm" (ngSubmit)="onSubmit()" class="space-y-5" autocomplete="off">
            <div>
              <label for="email" class="label">Email</label>
              <input id="email" type="email" [(ngModel)]="email" name="email" required
                class="input" [class.input-error]="error" placeholder="tu@email.com" autocomplete="email">
            </div>
            <div>
              <label for="password" class="label">Contraseña</label>
              <input id="password" type="password" [(ngModel)]="password" name="password" required
                class="input" [class.input-error]="error" placeholder="••••••" autocomplete="current-password">
            </div>

            @if (error) {
              <div class="flex items-center gap-2 bg-danger-light text-danger-dark text-sm px-4 py-3 rounded-lg animate-fade-in">
                <span>⚠</span>
                <span>{{ error }}</span>
              </div>
            }

            <button type="submit" [disabled]="loading"
              class="btn-primary w-full py-2.5">
              @if (loading) {
                <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Ingresando...
              } @else {
                Ingresar
              }
            </button>

            <p class="text-center text-sm text-gray-500">
              ¿No tenés cuenta?
              <a routerLink="/register" class="text-accent-500 font-medium hover:text-accent-600 transition-colors">Registrate</a>
            </p>
          </form>
        </div>
      </div>

      <div class="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 items-center justify-center p-12 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),transparent)]"></div>
        <div class="absolute top-20 -right-20 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>
        <div class="relative z-10 text-center max-w-md">
          <div class="text-6xl mb-6">🛡️</div>
          <h2 class="text-3xl font-bold text-white mb-4">Gestión de Reclamos con IA</h2>
          <p class="text-primary-200 text-lg leading-relaxed">
            Analizá, gestioná y resolvé reclamos de seguros con el poder de la inteligencia artificial.
          </p>
          <div class="mt-8 grid grid-cols-3 gap-4 text-center">
            <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p class="text-2xl mb-1">📊</p>
              <p class="text-xs text-primary-200 font-medium">Dashboard</p>
            </div>
            <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p class="text-2xl mb-1">🔍</p>
              <p class="text-xs text-primary-200 font-medium">Análisis IA</p>
            </div>
            <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p class="text-2xl mb-1">⚡</p>
              <p class="text-xs text-primary-200 font-medium">Tiempo Real</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  email = ''; password = ''; error = ''; loading = false;

  onSubmit() {
    this.loading = true; this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => { this.error = 'Credenciales inválidas'; this.loading = false; }
    });
  }
}

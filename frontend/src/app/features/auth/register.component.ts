import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
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
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Crear cuenta</h1>
            <p class="text-muted mt-1.5">Registrate en ClaimInsight</p>
          </div>

          <form #f="ngForm" (ngSubmit)="onSubmit()" class="space-y-5" autocomplete="off">
            <div>
              <label for="name" class="label">Nombre</label>
              <input id="name" type="text" [(ngModel)]="name" name="name" required
                class="input" placeholder="Tu nombre" autocomplete="name">
            </div>
            <div>
              <label for="email" class="label">Email</label>
              <input id="email" type="email" [(ngModel)]="email" name="email" required
                class="input" [class.input-error]="error" placeholder="tu@email.com" autocomplete="email">
            </div>
            <div>
              <label for="password" class="label">Contraseña</label>
              <input id="password" type="password" [(ngModel)]="password" name="password" required minlength="6"
                class="input" [class.input-error]="error" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
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
                Registrando...
              } @else {
                Crear cuenta
              }
            </button>

            <p class="text-center text-sm text-gray-500">
              ¿Ya tenés cuenta?
              <a routerLink="/login" class="text-accent-500 font-medium hover:text-accent-600 transition-colors">Ingresá</a>
            </p>
          </form>
        </div>
      </div>

      <div class="hidden lg:flex flex-1 bg-gradient-to-br from-accent-500 via-accent-600 to-primary-600 items-center justify-center p-12 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.1),transparent)]"></div>
        <div class="absolute top-20 -left-20 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"></div>
        <div class="relative z-10 text-center max-w-md">
          <div class="text-6xl mb-6">💻</div>
          <h2 class="text-3xl font-bold text-white mb-4">Empezá en segundos</h2>
          <p class="text-accent-200 text-lg leading-relaxed">
            Creá tu cuenta y comenzá a gestionar reclamos con herramientas potenciadas por IA.
          </p>
          <div class="mt-8 space-y-3 text-left">
            @for (item of benefits; track item) {
              <div class="flex items-center gap-3 text-white/80">
                <span class="text-accent-300">✓</span>
                <span>{{ item }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  name = ''; email = ''; password = ''; error = ''; loading = false;

  benefits = [
    'Dashboard ejecutivo en tiempo real',
    'Recomendaciones con inteligencia artificial',
    'Gestión completa de reclamos',
  ];

  onSubmit() {
    this.loading = true; this.error = '';
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => { this.error = e.error?.error || 'Error al registrarse'; this.loading = false; }
    });
  }
}

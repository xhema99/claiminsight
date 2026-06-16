import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Crear Cuenta</h1>
          <p class="text-gray-500 mt-2">Registrate en ClaimInsight</p>
        </div>
        <form #f="ngForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" [(ngModel)]="name" name="name" required class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Tu nombre">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" [(ngModel)]="email" name="email" required class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="tu@email.com">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contrase\u00f1a</label>
            <input type="password" [(ngModel)]="password" name="password" required minlength="6" class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="******">
          </div>
          @if (error) { <div class="bg-red-50 text-red-600 p-3 rounded text-sm">{{ error }}</div> }
          <button type="submit" [disabled]="loading" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {{ loading ? 'Registrando...' : 'Registrarse' }}
          </button>
          <p class="text-center text-sm text-gray-500">\u00bfYa ten\u00e9s cuenta? <a routerLink="/login" class="text-blue-600 hover:underline">Ingres\u00e1</a></p>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  name = ''; email = ''; password = ''; error = ''; loading = false;

  onSubmit() {
    this.loading = true; this.error = '';
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => { this.error = e.error?.error || 'Error al registrarse'; this.loading = false; }
    });
  }
}

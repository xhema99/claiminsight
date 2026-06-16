import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">ClaimInsight</h1>
          <p class="text-gray-500 mt-2">Sistema de Gesti\u00f3n de Reclamos</p>
        </div>
        <form #f="ngForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" [(ngModel)]="email" name="email" required class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="tu@email.com">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contrase\u00f1a</label>
            <input type="password" [(ngModel)]="password" name="password" required class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="******">
          </div>
          @if (error) { <div class="bg-red-50 text-red-600 p-3 rounded text-sm">{{ error }}</div> }
          <button type="submit" [disabled]="loading" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>
          <p class="text-center text-sm text-gray-500">\u00bfNo ten\u00e9s cuenta? <a routerLink="/register" class="text-blue-600 hover:underline">Registrate</a></p>
        </form>
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
      error: () => { this.error = 'Credenciales inv\u00e1lidas'; this.loading = false; }
    });
  }
}

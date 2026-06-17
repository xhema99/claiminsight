import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClaimService } from '../../core/claim.service';

@Component({
  selector: 'app-claim-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto animate-slide-up">
      <div class="mb-6">
        <a routerLink="/claims" class="text-sm text-accent-500 hover:text-accent-600 transition-colors">← Volver a reclamos</a>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">Nuevo Reclamo</h1>
        <p class="text-muted mt-1">Completá los datos del siniestro</p>
      </div>

      <form #f="ngForm" (ngSubmit)="onSubmit()" class="card p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label for="policyId" class="label">Número de Póliza</label>
            <input id="policyId" type="number" [(ngModel)]="policyId" name="policyId" required
              class="input" placeholder="Ej: 1">
          </div>
          <div>
            <label for="type" class="label">Tipo de Seguro</label>
            <select id="type" [(ngModel)]="type" name="type" required class="input">
              <option value="" disabled>Seleccioná un tipo</option>
              <option value="AUTO">Auto</option>
              <option value="HOME">Hogar</option>
              <option value="HEALTH">Salud</option>
              <option value="LIFE">Vida</option>
            </select>
          </div>
        </div>

        <div>
          <label for="amount" class="label">Monto Reclamado</label>
          <div class="relative">
            <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
            <input id="amount" type="number" [(ngModel)]="amount" name="amount" required min="0"
              class="input pl-8" placeholder="0.00">
          </div>
        </div>

        <div>
          <label for="description" class="label">Descripción del Siniestro</label>
          <textarea id="description" [(ngModel)]="description" name="description" required rows="4"
            class="input resize-none" placeholder="Describí brevemente lo ocurrido..."></textarea>
          <p class="text-xs text-gray-400 mt-1.5">{{ description.length }} caracteres</p>
        </div>

        @if (error) {
          <div class="flex items-center gap-2 bg-danger-light text-danger-dark text-sm px-4 py-3 rounded-lg animate-fade-in">
            <span>⚠</span>
            <span>{{ error }}</span>
          </div>
        }

        <div class="flex items-center gap-3 pt-2">
          <button type="submit" [disabled]="loading" class="btn-primary">
            @if (loading) {
              <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Creando...
            } @else {
              Crear Reclamo
            }
          </button>
          <a routerLink="/claims" class="btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `
})
export class ClaimCreateComponent {
  private svc = inject(ClaimService);
  private router = inject(Router);
  policyId = 0; type = ''; description = ''; amount = 0; error = ''; loading = false;

  onSubmit() {
    this.loading = true; this.error = '';
    this.svc.createClaim({ policyId: this.policyId, type: this.type, description: this.description, amount: this.amount })
      .subscribe({ next: () => this.router.navigate(['/claims']), error: () => { this.error = 'Error al crear el reclamo'; this.loading = false; } });
  }
}

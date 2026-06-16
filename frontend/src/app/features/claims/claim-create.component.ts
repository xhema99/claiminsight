import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClaimService } from '../../core/claim.service';

@Component({
  selector: 'app-claim-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Nuevo Reclamo</h1>
      <form #f="ngForm" (ngSubmit)="onSubmit()" class="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">ID de P\u00f3liza</label>
          <input type="number" [(ngModel)]="policyId" name="policyId" required class="mt-1 block w-full px-4 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Tipo</label>
          <select [(ngModel)]="type" name="type" required class="mt-1 block w-full px-4 py-2 border rounded-lg">
            <option value="">Seleccion\u00e1</option>
            <option value="AUTO">Auto</option>
            <option value="HOME">Hogar</option>
            <option value="HEALTH">Salud</option>
            <option value="LIFE">Vida</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Descripci\u00f3n</label>
          <textarea [(ngModel)]="description" name="description" required rows="4" class="mt-1 block w-full px-4 py-2 border rounded-lg"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Monto (\$)</label>
          <input type="number" [(ngModel)]="amount" name="amount" required min="0" class="mt-1 block w-full px-4 py-2 border rounded-lg">
        </div>
        @if (error) { <div class="bg-red-50 text-red-600 p-3 rounded text-sm">{{ error }}</div> }
        <div class="flex gap-4">
          <button type="submit" [disabled]="loading" class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">{{ loading ? 'Creando...' : 'Crear Reclamo' }}</button>
          <a routerLink="/claims" class="px-6 py-2 border rounded text-gray-700 hover:bg-gray-50 transition">Cancelar</a>
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
    this.loading = true;
    this.svc.createClaim({ policyId: this.policyId, type: this.type, description: this.description, amount: this.amount })
      .subscribe({ next: () => this.router.navigate(['/claims']), error: () => { this.error = 'Error al crear'; this.loading = false; } });
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ClaimService } from '../../core/claim.service';
import { BadgeComponent } from '../../shared/badge.component';
import { LoadingSkeletonComponent } from '../../shared/loading-skeleton.component';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe, BadgeComponent, LoadingSkeletonComponent],
  template: `
    <div class="animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Reclamos</h1>
          <p class="text-muted mt-1">Gestioná todos los reclamos del sistema</p>
        </div>
        <a routerLink="/claims/new" class="btn-primary shrink-0">
          <span>+</span> Nuevo Reclamo
        </a>
      </div>

      @if (error) {
        <div class="flex items-center gap-2 bg-danger-light text-danger-dark text-sm px-4 py-3 rounded-lg mb-4 animate-fade-in">
          <span>⚠</span>
          <span>{{ error }}</span>
        </div>
      }

      <div class="card overflow-hidden">
        <div class="p-4 border-b border-border dark:border-border-dark">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input type="text" placeholder="Buscar reclamos..." (input)="filter.set($any($event.target).value)"
                class="input pl-9" />
            </div>
            <select (change)="statusFilter.set($any($event.target).value)" class="input sm:w-44">
              <option value="">Todos los estados</option>
              <option value="OPEN">Abiertos</option>
              <option value="IN_PROGRESS">En Progreso</option>
              <option value="RESOLVED">Resueltos</option>
              <option value="REJECTED">Rechazados</option>
            </select>
          </div>
        </div>

        @if (loading) {
          <app-loading-skeleton type="table" [rows]="5" />
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border dark:border-border-dark bg-gray-50/50 dark:bg-gray-900/50">
                  <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Número</th>
                  <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Monto</th>
                  <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th class="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border dark:divide-border-dark">
                @for (c of filtered(); track c.id) {
                  <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td class="px-5 py-4">
                      <span class="font-mono text-sm font-medium text-gray-900 dark:text-white">{{ c.claimNumber }}</span>
                    </td>
                    <td class="px-5 py-4">
                      <app-badge [status]="c.type" />
                    </td>
                    <td class="px-5 py-4">
                      <span class="font-mono text-sm font-medium text-gray-900 dark:text-white">\${{ c.amount | number:'1.2-2' }}</span>
                    </td>
                    <td class="px-5 py-4">
                      <app-badge [status]="c.status" />
                    </td>
                    <td class="px-5 py-4">
                      <span class="text-sm text-gray-500">{{ c.createdAt | date:'dd MMM yyyy' }}</span>
                    </td>
                    <td class="px-5 py-4 text-right">
                      <a [routerLink]="['/claims', c.id]" class="btn-ghost text-xs px-3 py-1.5">
                        Ver detalle
                      </a>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-5 py-12 text-center">
                      <p class="text-4xl mb-3">🔍</p>
                      <p class="text-gray-500 font-medium">No se encontraron reclamos</p>
                      <p class="text-sm text-gray-400 mt-1">Probá con otros filtros o creá un nuevo reclamo</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div class="px-5 py-3 border-t border-border dark:border-border-dark flex items-center justify-between text-sm text-gray-500">
            <span>{{ filtered().length }} reclamo{{ filtered().length !== 1 ? 's' : '' }}</span>
          </div>
        }
      </div>
    </div>
  `
})
export class ClaimListComponent implements OnInit {
  private svc = inject(ClaimService);
  allClaims: any[] = [];
  filter = signal('');
  statusFilter = signal('');
  loading = true;
  error = '';

  ngOnInit() {
    this.svc.getClaims().subscribe({
      next: d => { this.allClaims = d; this.loading = false; },
      error: () => { this.error = 'Error al cargar reclamos'; this.loading = false; }
    });
  }

  filtered() {
    return this.allClaims.filter(c => {
      const q = this.filter().toLowerCase();
      const s = this.statusFilter();
      if (q && !c.claimNumber?.toLowerCase().includes(q) && !c.type?.toLowerCase().includes(q)) return false;
      if (s && c.status !== s) return false;
      return true;
    });
  }
}

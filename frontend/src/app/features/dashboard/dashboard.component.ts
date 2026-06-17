import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ClaimService } from '../../core/claim.service';
import { KpiCardComponent } from '../../shared/kpi-card.component';
import { BadgeComponent } from '../../shared/badge.component';
import { LoadingSkeletonComponent } from '../../shared/loading-skeleton.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [KpiCardComponent, BadgeComponent, LoadingSkeletonComponent, DatePipe, DecimalPipe, RouterLink],
  template: `
    @if (error) {
      <div class="flex items-center gap-2 bg-danger-light text-danger-dark text-sm px-4 py-3 rounded-lg animate-fade-in">
        <span>⚠</span>
        <span>{{ error }}</span>
      </div>
    }
    @if (!stats && !error) {
      <app-loading-skeleton type="kpi" />
    } @else if (stats) {
      <div class="animate-fade-in">
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p class="text-muted mt-1">Panorama general de reclamos</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <app-kpi-card label="Total Reclamos" [value]="stats.total | number" icon="📊" iconBg="bg-accent-50 text-accent-600" />
          <app-kpi-card label="Abiertos" [value]="stats.open | number" icon="🚩" iconBg="bg-warning-light text-warning-dark" />
          <app-kpi-card label="En Progreso" [value]="stats.inProgress | number" icon="⚡" iconBg="bg-info-light text-info-dark" />
          <app-kpi-card label="Resueltos" [value]="stats.resolved | number" icon="✅" iconBg="bg-success-light text-success-dark" />
          <app-kpi-card label="Rechazados" [value]="stats.rejected | number" icon="❌" iconBg="bg-danger-light text-danger-dark" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 card p-6">
            <h2 class="section-title mb-4">Distribución de Reclamos</h2>
            <div class="space-y-4">
              @for (item of distribution; track item.label) {
                <div>
                  <div class="flex justify-between text-sm mb-1.5">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{{ item.label }}</span>
                    <span class="text-gray-500">{{ item.count }} ({{ item.percent }}%)</span>
                  </div>
                  <div class="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-1000" [style.width.%]="item.percent" [class]="item.bar"></div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="section-title">IA Insights</h2>
              <span class="text-xl">🤖</span>
            </div>
            @if (stats.total === 0) {
              <p class="text-muted">No hay datos suficientes para análisis.</p>
            } @else {
              <div class="space-y-4">
                <div class="bg-accent-50/50 dark:bg-accent-500/5 rounded-lg p-4">
                  <p class="text-xs font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider">Resumen</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                    {{ stats.open > 0 ? 'Tenés ' + stats.open + ' reclamos abiertos que requieren atención inmediata.' : 'No hay reclamos abiertos.' }}
                    {{ stats.inProgress > 0 ? stats.inProgress + ' están en progreso.' : '' }}
                    {{ stats.resolved > 0 ? 'Se resolvieron ' + stats.resolved + ' reclamos.' : '' }}
                  </p>
                </div>
                <div class="bg-warning-light/50 dark:bg-warning/5 rounded-lg p-4">
                  <p class="text-xs font-medium text-warning-dark dark:text-warning-300 uppercase tracking-wider">Atención</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    @if (stats.open > 0) {
                      {{ stats.open }} reclamo{{ stats.open > 1 ? 's' : '' }} sin asignar — priorizá la revisión.
                    } @else {
                      Todos los reclamos están gestionados.
                    }
                  </p>
                </div>
                <a routerLink="/claims" class="btn-secondary w-full text-center text-sm mt-2">
                  Ver todos los reclamos →
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `
})
export class DashboardComponent implements OnInit {
  private svc = inject(ClaimService);
  stats: any = null;
  error = '';

  ngOnInit() {
    this.svc.getDashboard().subscribe({
      next: d => this.stats = d,
      error: () => this.error = 'No se pudieron cargar los datos. Verificá la conexión con el servidor.'
    });
  }

  get distribution() {
    if (!this.stats) return [];
    const total = this.stats.total || 1;
    return [
      { label: 'Abiertos', count: this.stats.open, percent: this.pct(this.stats.open, total), bar: 'bg-warning' },
      { label: 'En Progreso', count: this.stats.inProgress, percent: this.pct(this.stats.inProgress, total), bar: 'bg-info' },
      { label: 'Resueltos', count: this.stats.resolved, percent: this.pct(this.stats.resolved, total), bar: 'bg-success' },
      { label: 'Rechazados', count: this.stats.rejected, percent: this.pct(this.stats.rejected, total), bar: 'bg-danger' },
    ];
  }

  private pct(n: number, total: number): number {
    return Math.round((n / total) * 100);
  }
}

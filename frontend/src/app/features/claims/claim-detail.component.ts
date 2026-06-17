import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ClaimService } from '../../core/claim.service';
import { BadgeComponent } from '../../shared/badge.component';
import { AiInsightCardComponent } from '../../shared/ai-insight-card.component';
import { LoadingSkeletonComponent } from '../../shared/loading-skeleton.component';

@Component({
  selector: 'app-claim-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe, BadgeComponent, AiInsightCardComponent, LoadingSkeletonComponent],
  template: `
    <div class="animate-fade-in">
      <a routerLink="/claims" class="inline-flex items-center gap-1.5 text-sm text-accent-500 hover:text-accent-600 transition-colors mb-6">
        <span>←</span> Volver a reclamos
      </a>

      @if (error) {
        <div class="flex items-center gap-2 bg-danger-light text-danger-dark text-sm px-4 py-3 rounded-lg animate-fade-in">
          <span>⚠</span>
          <span>{{ error }}</span>
        </div>
      } @else if (loading) {
        <app-loading-skeleton type="detail" />
      } @else if (claim) {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <div class="card p-6">
              <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div class="flex items-center gap-3 mb-1">
                    <h1 class="text-xl font-bold text-gray-900 dark:text-white font-mono">{{ claim.claimNumber }}</h1>
                    <app-badge [status]="claim.status" />
                  </div>
                  <p class="text-muted">Creado el {{ claim.createdAt | date:'dd MMM yyyy, HH:mm' }}</p>
                </div>
                @if (!rec) {
                  <button (click)="loadRec()" [disabled]="loadingRec" class="btn-accent shrink-0">
                    @if (loadingRec) {
                      <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Analizando...
                    } @else {
                      <span>✨</span> Analizar con IA
                    }
                  </button>
                }
              </div>
            </div>

            <div class="card p-6">
              <h2 class="section-title mb-4">Información del Reclamo</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <p class="text-muted">Tipo</p>
                    <app-badge [status]="claim.type" />
                  </div>
                  <div>
                    <p class="text-muted">ID de Póliza</p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white font-mono">{{ claim.policyId }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <p class="text-muted">Monto Reclamado</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white font-mono">\${{ claim.amount | number:'1.2-2' }}</p>
                  </div>
                  <div>
                    <p class="text-muted">Última actualización</p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ claim.updatedAt | date:'dd MMM yyyy, HH:mm' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <h2 class="section-title mb-3">Descripción</h2>
              <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{{ claim.description }}</p>
            </div>

            <div class="card p-6">
              <h2 class="section-title mb-4">Línea de Tiempo</h2>
              <div class="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-6">
                <div class="relative">
                  <div class="absolute -left-[1.85rem] w-3.5 h-3.5 rounded-full bg-warning border-2 border-surface dark:border-surface-dark"></div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Reclamo creado</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ claim.createdAt | date:'dd MMM yyyy, HH:mm' }}</p>
                </div>
                <div class="relative">
                  <div class="absolute -left-[1.85rem] w-3.5 h-3.5 rounded-full bg-accent-500 border-2 border-surface dark:border-surface-dark"></div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Estado actual: {{ statusLabel }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ claim.updatedAt | date:'dd MMM yyyy, HH:mm' }}</p>
                </div>
                @if (rec) {
                  <div class="relative">
                    <div class="absolute -left-[1.85rem] w-3.5 h-3.5 rounded-full bg-accent-500 border-2 border-surface dark:border-surface-dark animate-pulse-soft"></div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Análisis de IA completado</p>
                    <p class="text-xs text-gray-400 mt-0.5">Recomendación generada</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <div class="space-y-6">
            @if (rec) {
              <app-ai-insight-card [data]="recData" />
            }

            <div class="card p-6">
              <h2 class="section-title mb-3">Resumen</h2>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between"><span class="text-gray-500">Estado</span><app-badge [status]="claim.status" /></div>
                <div class="flex justify-between"><span class="text-gray-500">Tipo</span><span class="font-medium text-gray-900 dark:text-white">{{ claim.type }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Monto</span><span class="font-mono font-medium text-gray-900 dark:text-white">\${{ claim.amount | number:'1.2-2' }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Póliza</span><span class="font-mono text-gray-900 dark:text-white">{{ claim.policyId }}</span></div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class ClaimDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private svc = inject(ClaimService);
  claim: any = null; rec: any = null; loading = true; loadingRec = false; error = '';

  ngOnInit() {
    this.svc.getClaimById(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: d => { this.claim = d; this.loading = false; },
        error: () => { this.error = 'Error al cargar el reclamo'; this.loading = false; }
      });
  }

  loadRec() {
    this.loadingRec = true;
    this.svc.getRecommendation(this.claim.id).subscribe({
      next: d => { this.rec = d; this.loadingRec = false; },
      error: () => { this.loadingRec = false; }
    });
  }

  get statusLabel(): string {
    const map: Record<string, string> = {
      OPEN: 'Abierto', IN_PROGRESS: 'En Progreso', RESOLVED: 'Resuelto', REJECTED: 'Rechazado'
    };
    return map[this.claim?.status] || this.claim?.status;
  }

  get recData(): any {
    try {
      const parsed = JSON.parse(this.rec.recommendation);
      return {
        priority: parsed.priority || 'MEDIA',
        adjuster: parsed.adjuster || 'No especificado',
        days: parsed.days || 0,
        actions: parsed.actions || [],
        reasoning: parsed.reasoning || 'Análisis completado.'
      };
    } catch {
      return { priority: 'MEDIA', adjuster: 'General', days: 10, actions: [this.rec.recommendation], reasoning: 'Recomendación basada en análisis.' };
    }
  }
}

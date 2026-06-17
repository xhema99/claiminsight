import { Component, Input } from '@angular/core';
import { BadgeComponent } from './badge.component';

@Component({
  selector: 'app-ai-insight-card',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <div class="card overflow-hidden animate-slide-up">
      <div class="bg-gradient-to-r from-accent-500 to-primary-500 px-5 py-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">✨</span>
          <span class="text-sm font-semibold text-white">Recomendación IA</span>
        </div>
      </div>
      <div class="p-5 space-y-5">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-muted mb-1">Prioridad</p>
            <app-badge [status]="data.priority" />
          </div>
          <div>
            <p class="text-muted mb-1">Ajustador</p>
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ data.adjuster }}</p>
          </div>
          <div>
            <p class="text-muted mb-1">Tiempo estimado</p>
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ data.days }} días</p>
          </div>
        </div>

        <div>
          <p class="text-muted mb-2">Acciones recomendadas</p>
          <ul class="space-y-1.5">
            @for (action of data.actions; track $index) {
              <li class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span class="text-success mt-0.5">✓</span>
                {{ action }}
              </li>
            }
          </ul>
        </div>

        <div class="bg-accent-50/50 dark:bg-accent-500/5 rounded-lg p-3.5">
          <div class="flex items-start gap-2">
            <span class="text-accent-500 text-sm mt-0.5">ℹ</span>
            <div>
              <p class="text-xs font-medium text-accent-700 dark:text-accent-300 mb-0.5">Análisis de IA</p>
              <p class="text-xs text-accent-600 dark:text-accent-400 leading-relaxed">{{ data.reasoning }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AiInsightCardComponent {
  @Input() data: { priority: string; adjuster: string; days: number; actions: string[]; reasoning: string } = {
    priority: 'MEDIA', adjuster: '', days: 0, actions: [], reasoning: ''
  };
}

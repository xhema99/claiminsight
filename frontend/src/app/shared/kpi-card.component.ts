import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  template: `
    <div class="card-hover p-5 animate-fade-in">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-muted font-medium">{{ label }}</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1 tracking-tight">
            {{ value }}
          </p>
        </div>
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" [class]="iconBg">
          <span class="text-lg">{{ icon }}</span>
        </div>
      </div>
      @if (trend) {
        <div class="flex items-center gap-1.5 mt-3">
          <span class="text-xs font-medium" [class]="trendColor">
            {{ trend }}
          </span>
          <span class="text-xs text-gray-400">{{ trendLabel }}</span>
        </div>
      }
    </div>
  `
})
export class KpiCardComponent {
  @Input() label = '';
  @Input() value: string | number | null = '';
  @Input() icon = '';
  @Input() iconBg = 'bg-accent-50 text-accent-600 dark:bg-accent-500/10';
  @Input() trend = '';
  @Input() trendLabel = '';
  @Input() trendColor = 'text-success';
}

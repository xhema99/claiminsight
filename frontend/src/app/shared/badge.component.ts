import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span class="badge" [class]="variantClasses">
      <span class="w-1.5 h-1.5 rounded-full" [class]="dotClass"></span>
      {{ label }}
    </span>
  `
})
export class BadgeComponent {
  @Input() status = '';

  get label(): string {
    const map: Record<string, string> = {
      OPEN: 'Abierto', IN_PROGRESS: 'En Progreso', RESOLVED: 'Resuelto', REJECTED: 'Rechazado',
      ALTA: 'Alta', MEDIA: 'Media', BAJA: 'Baja',
      AUTO: 'Auto', HOME: 'Hogar', HEALTH: 'Salud', LIFE: 'Vida',
    };
    return map[this.status] || this.status;
  }

  get variantClasses(): string {
    const map: Record<string, string> = {
      OPEN: 'bg-warning-light text-warning-dark dark:bg-warning/10',
      IN_PROGRESS: 'bg-info-light text-info-dark dark:bg-info/10',
      RESOLVED: 'bg-success-light text-success-dark dark:bg-success/10',
      REJECTED: 'bg-danger-light text-danger-dark dark:bg-danger/10',
      ALTA: 'bg-danger-light text-danger-dark dark:bg-danger/10',
      MEDIA: 'bg-warning-light text-warning-dark dark:bg-warning/10',
      BAJA: 'bg-success-light text-success-dark dark:bg-success/10',
    };
    return map[this.status] || 'bg-gray-100 text-gray-700 dark:bg-gray-800';
  }

  get dotClass(): string {
    const map: Record<string, string> = {
      OPEN: 'bg-warning', IN_PROGRESS: 'bg-info', RESOLVED: 'bg-success', REJECTED: 'bg-danger',
      ALTA: 'bg-danger', MEDIA: 'bg-warning', BAJA: 'bg-success',
    };
    return map[this.status] || 'bg-gray-400';
  }
}

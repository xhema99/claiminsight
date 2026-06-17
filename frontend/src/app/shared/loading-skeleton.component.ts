import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  template: `
    <div class="space-y-4 animate-pulse">
      @if (type === 'table') {
        <div class="space-y-3">
          @for (row of rowArray; track $index) {
            <div class="flex gap-4">
              <div class="skeleton h-5 flex-1"></div>
              <div class="skeleton h-5 w-24"></div>
              <div class="skeleton h-5 w-20"></div>
              <div class="skeleton h-5 w-16"></div>
            </div>
          }
        </div>
      }
      @if (type === 'kpi') {
        <div class="grid grid-cols-4 gap-4">
          @for (row of [1,2,3,4]; track $index) {
            <div class="card p-5 space-y-3">
              <div class="skeleton h-4 w-24"></div>
              <div class="skeleton h-8 w-16"></div>
            </div>
          }
        </div>
      }
      @if (type === 'detail') {
        <div class="space-y-6">
          <div class="skeleton h-8 w-64"></div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2"><div class="skeleton h-4 w-20"></div><div class="skeleton h-6 w-40"></div></div>
            <div class="space-y-2"><div class="skeleton h-4 w-20"></div><div class="skeleton h-6 w-32"></div></div>
          </div>
          <div class="skeleton h-32 w-full"></div>
        </div>
      }
    </div>
  `
})
export class LoadingSkeletonComponent {
  @Input() type: 'table' | 'kpi' | 'detail' = 'table';
  @Input() rows = 5;

  get rowArray(): number[] { return Array(this.rows).fill(0).map((_, i) => i); }
}

import { Component, inject, OnInit } from '@angular/core';
import { ClaimService } from '../../core/claim.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div>
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div class="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <p class="text-sm text-gray-500">Total</p>
          <p class="text-3xl font-bold text-gray-800">{{ stats.total }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
          <p class="text-sm text-gray-500">Abiertos</p>
          <p class="text-3xl font-bold text-yellow-600">{{ stats.open }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <p class="text-sm text-gray-500">En Progreso</p>
          <p class="text-3xl font-bold text-blue-600">{{ stats.inProgress }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <p class="text-sm text-gray-500">Resueltos</p>
          <p class="text-3xl font-bold text-green-600">{{ stats.resolved }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow border-l-4 border-red-500">
          <p class="text-sm text-gray-500">Rechazados</p>
          <p class="text-3xl font-bold text-red-600">{{ stats.rejected }}</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private svc = inject(ClaimService);
  stats: any = {};

  ngOnInit() { this.svc.getDashboard().subscribe(d => this.stats = d); }
}

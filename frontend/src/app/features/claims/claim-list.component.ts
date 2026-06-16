import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClaimService } from '../../core/claim.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe],
  template: `
    <div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Reclamos</h1>
        <a routerLink="/claims/new" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">+ Nuevo Reclamo</a>
      </div>
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N\u00famero</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acci\u00f3n</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for (c of claims; track c.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium">{{ c.claimNumber }}</td>
                <td class="px-6 py-4">{{ c.type }}</td>
                <td class="px-6 py-4">\${{ c.amount | number:'1.2-2' }}</td>
                <td class="px-6 py-4"><span class="px-2 py-1 text-xs rounded-full" [class]="statusClass(c.status)">{{ c.status }}</span></td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ c.createdAt | date:'dd/MM/yyyy' }}</td>
                <td class="px-6 py-4"><a [routerLink]="['/claims', c.id]" class="text-blue-600 hover:underline text-sm">Ver</a></td>
              </tr>
            } @empty { <tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">No hay reclamos</td></tr> }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ClaimListComponent implements OnInit {
  private svc = inject(ClaimService);
  claims: any[] = [];

  ngOnInit() { this.svc.getClaims().subscribe(d => this.claims = d); }

  statusClass(s: string) {
    const map: any = { OPEN: 'bg-yellow-100 text-yellow-800', IN_PROGRESS: 'bg-blue-100 text-blue-800', RESOLVED: 'bg-green-100 text-green-800', REJECTED: 'bg-red-100 text-red-800' };
    return map[s] || 'bg-gray-100 text-gray-800';
  }
}

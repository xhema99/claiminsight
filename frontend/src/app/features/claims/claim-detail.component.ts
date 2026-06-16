import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClaimService } from '../../core/claim.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-claim-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe],
  template: `
    <div class="max-w-4xl mx-auto">
      <a routerLink="/claims" class="text-blue-600 hover:underline mb-4 inline-block">&larr; Volver</a>
      @if (loading) { <div class="text-center py-8 text-gray-500">Cargando...</div> }
      @if (claim) {
        <div class="bg-white p-6 rounded-xl shadow mb-6">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-2xl font-bold">Reclamo {{ claim.claimNumber }}</h1>
              <p class="text-gray-500 mt-1">{{ claim.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
            </div>
            <span class="px-3 py-1 text-sm rounded-full font-medium" [class]="statusClass(claim.status)">{{ claim.status }}</span>
          </div>
          <div class="grid grid-cols-2 gap-6 mt-6">
            <div><p class="text-sm text-gray-500">Tipo</p><p class="font-medium">{{ claim.type }}</p></div>
            <div><p class="text-sm text-gray-500">Monto</p><p class="font-medium text-lg">\${{ claim.amount | number:'1.2-2' }}</p></div>
          </div>
          <div class="mt-6"><p class="text-sm text-gray-500">Descripci\u00f3n</p><p class="mt-1">{{ claim.description }}</p></div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-4">Recomendaci\u00f3n IA</h2>
          @if (!rec) {
            <button (click)="loadRec()" [disabled]="loadingRec" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50">
              {{ loadingRec ? 'Generando...' : 'Generar con IA' }}
            </button>
          }
          @if (rec) {
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-500 mb-2">Respuesta de Groq:</p>
              <pre class="whitespace-pre-wrap text-sm">{{ rec.recommendation }}</pre>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class ClaimDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private svc = inject(ClaimService);
  claim: any = null; rec: any = null; loading = true; loadingRec = false;

  ngOnInit() { this.svc.getClaimById(Number(this.route.snapshot.paramMap.get('id'))).subscribe(d => { this.claim = d; this.loading = false; }); }

  loadRec() { this.loadingRec = true; this.svc.getRecommendation(this.claim.id).subscribe(d => { this.rec = d; this.loadingRec = false; }); }

  statusClass(s: string) {
    const map: any = { OPEN: 'bg-yellow-100 text-yellow-800', IN_PROGRESS: 'bg-blue-100 text-blue-800', RESOLVED: 'bg-green-100 text-green-800', REJECTED: 'bg-red-100 text-red-800' };
    return map[s] || '';
  }
}

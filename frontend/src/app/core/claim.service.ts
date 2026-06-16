import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClaimService {
  private http = inject(HttpClient);

  getClaims(status?: string, page = 0, size = 10) {
    const params: any = { page, size };
    if (status) params.status = status;
    return this.http.get<any[]>('/api/claims', { params });
  }

  getClaimById(id: number) { return this.http.get<any>(`/api/claims/${id}`); }

  createClaim(data: { policyId: number; type: string; description: string; amount: number }) {
    return this.http.post<any>('/api/claims', data);
  }

  getRecommendation(id: number) { return this.http.get<any>(`/api/claims/${id}/recommendation`); }
  getDashboard() { return this.http.get<any>('/api/dashboard'); }
}

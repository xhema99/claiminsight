import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  token = signal<string | null>(localStorage.getItem('token'));
  userName = signal<string | null>(localStorage.getItem('name'));

  login(email: string, password: string) {
    return this.http.post<any>('/api/auth/login', { email, password }).pipe(
      tap(r => { localStorage.setItem('token', r.token); localStorage.setItem('name', r.name || ''); this.token.set(r.token); this.userName.set(r.name); })
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post<any>('/api/auth/register', { name, email, password }).pipe(
      tap(r => { localStorage.setItem('token', r.token); localStorage.setItem('name', r.name); this.token.set(r.token); this.userName.set(r.name); })
    );
  }

  logout() {
    localStorage.clear(); this.token.set(null); this.userName.set(null); this.router.navigate(['/login']);
  }

  isLoggedIn() { return this.token() !== null; }
}

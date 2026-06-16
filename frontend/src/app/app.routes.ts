import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent) },
  {
    path: '', canActivate: [authGuard],
    loadComponent: () => import('./layouts/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'claims', loadComponent: () => import('./features/claims/claim-list.component').then(m => m.ClaimListComponent) },
      { path: 'claims/new', loadComponent: () => import('./features/claims/claim-create.component').then(m => m.ClaimCreateComponent) },
      { path: 'claims/:id', loadComponent: () => import('./features/claims/claim-detail.component').then(m => m.ClaimDetailComponent) },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

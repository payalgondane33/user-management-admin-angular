import { Routes } from '@angular/router';
import { DashoardComponent } from './pages/dashoard/dashoard';
import { Profile } from './pages/profile/profile';
import { ReportsAnalytics } from './pages/reports-analytics/reports-analytics';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashoardComponent,
    title: 'User Management Admin - Dashboard',
  },
  {
    path: 'profile/:id',
    component: Profile,
    title: 'User Management Admin - Profile',
  },
  {
    path: 'reports-analytics',
    component: ReportsAnalytics,
    title: 'User Management Admin - Reports & Analytics',
  },
];

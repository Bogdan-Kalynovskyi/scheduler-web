import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { AuthGuard } from '../services/auth-guard';

const adminRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
       // canActivateChild: [AuthGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(adminRoutes);
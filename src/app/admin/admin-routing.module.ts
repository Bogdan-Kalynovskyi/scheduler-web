import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './admin.component';

import { AuthGuard } from '../services/auth-guard';

const adminRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(adminRoutes);